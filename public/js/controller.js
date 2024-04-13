// gameController.js

let currentSong;
let guessInput; // Declare guessInput variable outside the function

function startGame() {
    fetchSongsAndPlayRandom();
    createGuessInput(); // Create guess input box when the game starts
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
    guessInput = document.createElement('input');
    guessInput.type = 'text';
    guessInput.id = 'guessInput';
    guessInput.placeholder = 'Enter your guess';

    const guessButton = document.createElement('button');
    guessButton.textContent = 'Submit';
    guessButton.addEventListener('click', checkGuess);

    const guessContainer = document.getElementById('guessContainer');
    guessContainer.appendChild(guessInput);
    guessContainer.appendChild(guessButton);
}

function checkGuess() {
    const userGuess = guessInput.value.trim().toLowerCase();
    const correctAnswer = currentSong.name.toLowerCase();
    const resultMessage = userGuess === correctAnswer ? 'Congratulations! You guessed the song correctly.' : 'Sorry, incorrect guess. Try again.';
    document.getElementById('resultText').textContent = resultMessage;
}

// Start the game when the page loads
window.onload = startGame;
