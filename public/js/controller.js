// controller.js

let currentSong;
let guessInput; // Declare guessInput variable outside the function
let songNames = []; // Store song names fetched from songs.json

function startGame() {
    fetchSongNames(); // Fetch song names when the game starts
    fetchSongsAndPlayRandom();
    createGuessInput(); // Create guess input box when the game starts
}

function fetchSongNames() {
    fetch('./songs.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            songNames = data.songs.map(song => song.name);
        })
        .catch(error => console.error('Error fetching song names:', error));
}

function fetchSongsAndPlayRandom() {
    fetch('./songs.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        var songs = data.songs;
        if (songs.length > 0) {
            var randomIndex = Math.floor(Math.random() * songs.length);
            currentSong = songs[randomIndex];
            playSong(currentSong.path);
        } else {
            alert('No songs found!');
        }
    })
    .catch(error => console.error('Error fetching songs:', error));
}

function playSong(songPath) {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songPath;
    audioPlayer.play();
}

function createGuessInput() {
    guessInput = document.getElementById('guessInput');

    guessInput.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase();
        const suggestions = getSuggestions(inputValue);
        updateAutocomplete(suggestions);
    });

    const guessButton = document.getElementById('guessButton');
    guessButton.addEventListener('click', checkGuess);
}

function getSuggestions(inputValue) {
    return songNames.filter(songName => songName.toLowerCase().includes(inputValue));
}

function updateAutocomplete(suggestions) {
    const datalist = document.getElementById('songSuggestions');
    datalist.innerHTML = '';

    suggestions.forEach(suggestion => {
        const option = document.createElement('option');
        option.value = suggestion;
        datalist.appendChild(option);
    });
}

function checkGuess() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentSong.name.toLowerCase();
    const resultMessage = userGuess === correctAnswer ? 'Congratulations! You guessed the song correctly.' : 'Sorry, incorrect guess. Try again.';
    document.getElementById('resultText').textContent = resultMessage;
}

// Start the game when the page loads   
window.onload = startGame;
