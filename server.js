const express = require('express');
const mongoose = require('mongoose');
const User = require('./public/model/user.js'); // Adjust the path as needed
const Score = require('./public/model/score.js'); // Adjust the path as needed
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
require('dotenv').config();



const app = express();
const port =  process.env.port
app.use(express.json());
// MongoDB connection URI

const uri = process.env.mongodb_uri;

// Connect to MongoDB
mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/register', async (req, res) => {
    try {
        await mongoose.connect(uri)
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).send('Invalid email address');
        }
        
       
    //console.log('User before saving:', user); // Inspect the user object here
    await user.save();
        res.send('User registered successfully!');
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send('An error occurred while registering the user.');
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Fetch user by email
        const user = await User.findOne({ email });
    
        if (!user) {
          return res.status(401).send('Invalid username or password');
        }
    
        const passwordsMatch = await bcrypt.compare(password, user.password);
    
        if (passwordsMatch) {
          // Login successful (generate session or token)
          res.send('Login successful!');
        } else {
          res.status(401).send('Invalid username or password');
        }
      } catch (error) {
        console.error('Error handling login:', error.message);
        res.status(500).send('An error occurred during login.');
      }
    
});

app.post('/leaderboard', async (req, res) => {
    try {
        await mongoose.connect(uri)
        const { username, scor } = req.body;
    
        const score = new Score({
            username: username,
            score : scor,
            date :  Date()
        });
        
       
    await score.save();
        res.send('Scor salvat!');
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).send('An error occurred while registering the score.');
    }

});


app.get('/leaderboard', async (req, res) => {
    try {
      // Query the database for scores, sort them by score in descending order, and limit to 10 results
      const leaderboard = await Score.find().sort({ score: -1 }).limit(10);
      res.json(leaderboard); // Send the sorted leaderboard as JSON response
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
    }
  });


// async function fetchDataFromMongoDB() {
//     try {
//         // Fetch data from MongoDB
//         const users = await User.find().limit(10);
//         console.log('Users:');
//         console.log(users);
//     } catch (error) {
//         console.error('Error fetching data from MongoDB:', error);
//     } finally {
//         // Disconnect from MongoDB after fetching data
//         mongoose.disconnect();
//     }
// }

// fetchDataFromMongoDB();







// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
