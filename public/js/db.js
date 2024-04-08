const mongoose = require('mongoose');
const Movie = require('../model/movie');



// MongoDB connection URI




// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        fetchDataFromMongoDB();
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

    async function fetchDataFromMongoDB() {
        try {
            // Ensure the MongoDB client is connected before executing database operations
            if (!mongoose.connection.readyState) {
                await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
                console.log('Connected to MongoDB');
            }
    
            // Fetch data from MongoDB
            const movies = await Movie.find().limit(10);
            console.log('Movies:');
            console.log(movies);
        } catch (error) {
            console.error('Error fetching data from MongoDB:', error);
        } finally {
            // Disconnect from MongoDB after fetching data
            mongoose.disconnect();
        }
    }
    
fetchDataFromMongoDB();
