const express = require('express');
const mongoose = require('mongoose');
const Movie = require('./public/model/movie.js'); // Adjust the path as needed
require('dotenv').config();


const app = express();
const port = 3025;

// MongoDB connection URI

const uri = process.env.mongodb_uri;

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define an API endpoint to fetch movies
app.get('/api/movies', async (req, res) => {
  try {
    // Ensure the MongoDB client is connected before executing database operations
    const movies = await Movie.find().limit(10);

      res.json(movies);
  } catch (error) {
      console.error('Error fetching data from MongoDB:', error);
      res.status(500).json({ error: error.message }); // Send the actual error message
  }
});


// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
