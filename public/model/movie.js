const mongoose = require('mongoose');

// Define the schema for the movie document
const movieSchema = new mongoose.Schema({
  plot: String,
  genres: [String],
  runtime: Number,
  cast: [String],
  poster: String,
  title: String,
  fullplot: String,
  languages: [String],
  released: Date,
  directors: [String],
  rated: String,
  awards: {
    type: Object // You can define a more specific schema for awards if needed
  },
  lastupdated: Date,
  year: Number,
  imdb: {
    type: Object // You can define a more specific schema for IMDb data if needed
  },
  countries: [String],
  type: String,
  tomatoes: {
    type: Object // You can define a more specific schema for Tomatoes data if needed
  },
  num_mflix_comments: Number
});

// Define a model for the movie collection
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
