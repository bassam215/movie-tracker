const httpStatusText = require("../utils/httpStatusText");

const searchMoviesController = async (req, res) => {

    const { query } = req.query;

    if (!query || query.trim().length === 0) {
        return res.status(400).json({
            status: httpStatusText.ERROR,
            message: "Search query is required"
        });
    }

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                status: httpStatusText.ERROR,
                message: "Failed to fetch movies from TMDB"
            });
        }

        const data = await response.json();

        const movies = data.results.map((movie) => ({
            movieId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path,
            releaseDate: movie.release_date,
            overview: movie.overview,
            voteAverage: movie.vote_average
            
        }));

        res.status(200).json({
            status: httpStatusText.SUCCESS,
            data: {
                movies
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: httpStatusText.ERROR,
            message: "Something went wrong while searching movies"
        });
    }
};

module.exports = {
    searchMoviesController
};