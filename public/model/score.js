const mongoose = require('mongoose');
const scoreSchema = new mongoose.Schema({
    username : String,
    score : Number,
    date : Date
});

const Score = mongoose.model('Score', scoreSchema);

module.exports = Score;