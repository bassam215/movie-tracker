const { body, query } = require("express-validator");

const addMovieValidation = [
    body("movieId")
        .trim()
        .notEmpty()
        .withMessage("Movie ID is required")
        .isInt()
        .withMessage("Movie ID must be an integer"),

    body("rating")
        .trim()
        .notEmpty()
        .withMessage("Rating is required")
        .isInt()
        .withMessage("Rating must be an integer")
        .isLength({ min: 1, max: 10 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 1, max: 500 })
        .withMessage("Comment must be between 1 and 500 characters"),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["watched", "watching", "want_to_watch"])
        .withMessage("Status must be one of watched, watching, or want_to_watch")
];

const movieStatusValidation = [
    query("status")
        .optional()
        .isIn(["watched", "watching", "want_to_watch"])
        .withMessage("Invalid movie status")
];

const updateMovieValidation = [
    body("movieId")
        .trim()
        .notEmpty()
        .withMessage("Movie ID is required")
        .isInt()
        .withMessage("Movie ID must be an integer"),

    body("rating")
        .trim()
        .notEmpty()
        .withMessage("Rating is required")
        .isInt()
        .withMessage("Rating must be an integer")
        .isLength({ min: 1, max: 10 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .trim()
        .notEmpty()
        .withMessage("Comment is required")
        .isLength({ min: 1, max: 500 })
        .withMessage("Comment must be between 1 and 500 characters"),

    body("status")
        .trim()
        .notEmpty()
        .withMessage("Status is required")
        .isIn(["watched", "watching", "want_to_watch"])
        .withMessage("Status must be one of watched, watching, or want_to_watch")
];

const searchMovieValidation = [
    query("query")
        .trim()
        .notEmpty()
        .withMessage("Search query is required")
        .isLength({ min: 2, max: 100 })
        .withMessage("Search query must be between 2 and 100 characters")
];



module.exports = {
    addMovieValidation,
    movieStatusValidation,
    updateMovieValidation,
    searchMovieValidation
};