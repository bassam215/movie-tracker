const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        movieId: {
            type: Number,
            required: true
        },

        rating: {
            type: Number,
            min: 0,
            max: 10
        },

        comment: {
            type: String,
            maxlength: 500
        },

        status: {
            type: String,
            enum: [
                "watched",
                "watching",
                "want_to_watch"
            ],
            default: "want_to_watch"
        }
    },
    {
        timestamps: true
    }
);
movieSchema.index(
    { user: 1, movieId: 1 },
    { unique: true }
);

module.exports = mongoose.model("movies", movieSchema);