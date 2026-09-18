const express = require("express") 
const router = express.Router();

const  authMiddleware  = require("../middlewares/auth.middleware");
const { addMovieController , getMovieController, updateMovieController, deleteMovieController } = require("../controllers/movie.controller");
const { addMovieValidation, movieStatusValidation, updateMovieValidation, searchMovieValidation } = require("../middlewares/movie.validation");
const { searchMoviesController } = require("../controllers/tmdb.controller");


router.get("/search", searchMovieValidation,searchMoviesController); 
router.post("/",authMiddleware, addMovieValidation, addMovieController);
router.get("/",authMiddleware,movieStatusValidation,getMovieController);
router.patch("/:id", authMiddleware, updateMovieValidation, updateMovieController);
router.delete("/:id", authMiddleware, deleteMovieController);


module.exports = router;


