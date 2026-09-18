const { validationResult } = require("express-validator");
const httpStatusText = require("../utils/httpStatusText");

const User = require("../models/user.model"); 
const Movie = require("../models/movie.model");
const addMovieController = async (req, res) => { 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: errors.array()
        });
    }
    const { movieId, rating, comment,status } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
        return res.status(401).json({
            status: httpStatusText.ERROR,
            message: "User not found"
        });
    }
    const movie = await Movie.findOne({ user: user._id, movieId });
    if (movie) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: "Movie already added"
        });
    }
    const newMovie = new Movie({ user: user._id, movieId, rating, comment,status });
    await newMovie.save();
    res.status(201).json({
        status: httpStatusText.SUCCESS,
        message: "Movie added successfully",
        data: { movie: newMovie }
    }); 
};

const getMovieController = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: errors.array(),
            data: {  movies: [] }
        });
    }
    let movies= []
    if (req.query.status) {
        movies = await Movie.find({ user: req.user.id, status: req.query.status });
    }
    else {
        movies = await Movie.find({ user: req.user.id });
    }
    
    if (movies.length === 0) {
        return res.status(200).json({
            status: httpStatusText.SUCCESS,
            message: "No movies found"
        });
    }
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Movies found successfully",
        data: { movies }
    });
};


const updateMovieController = async (req, res) => {

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: errors.array()
        });
    }

    // Find movie by MongoDB document ID
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({
            status: httpStatusText.ERROR,
            message: "Movie not found"
        });
    }

    // Check if the movie belongs to the logged-in user
    if (movie.user.toString() !== req.user.id) {
        return res.status(403).json({
            status: httpStatusText.ERROR,
            message: "You are not authorized to update this movie"
        });
    }

    const { rating, comment, status } = req.body;

    if (rating !== undefined) {
        movie.rating = rating;
    }

    if (comment !== undefined) {
        movie.comment = comment;
    }

    if (status !== undefined) {
        movie.status = status;
    }

    await movie.save();

    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Movie updated successfully",
        data: {
            movie
        }
    });
};

const deleteMovieController = async (req, res) => {


    const movie = await Movie.findById(req.params.id);
    if (!movie) {
        return res.status(404).json({
            status: httpStatusText.ERROR,
            message: "Movie not found"
        });
    }
    if (movie.user.toString() !== req.user.id) {
        return res.status(403).json({
            status: httpStatusText.ERROR,
            message: "You are not authorized to delete this movie"
        });
    }
    await movie.deleteOne();
    res.status(200).json({
        status: httpStatusText.SUCCESS,
        message: "Movie deleted successfully"
    });
};
module.exports = { addMovieController, getMovieController, updateMovieController, deleteMovieController };