// controller.js

let currentSong;
let guessInput; // Declare guessInput variable outside the function
let songNames = []; // Store song names fetched from songs.json
let playbackTime = 5;
let strikes = 0;
let usedSongNames = [];
let songLen;
let isOver = 0;
let score = 0;

function startGame() {
    strikes=0;
    score = 0;
    playbackTime = 5;
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
            songLen = songNames.length
        })
        .catch(error => console.error('Error fetching song names:', error));
}

function fetchSongsAndPlayRandom() {
  {
    fetch('./songs.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        var songs = data.songs;
        if (score === songLen) {
            alert("Congratulations! You've guessed all the songs!");
            location.reload()
            startGame()
        }
        if (songs.length > 0) {
            var randomIndex = Math.floor(Math.random() * songs.length);
            currentSong = songs[randomIndex];
            if(score != songLen ){
           do {
              randomIndex = Math.floor(Math.random() * songs.length);
              currentSong = songs[randomIndex];          
              console.log(usedSongNames.length)
              console.log(songNames.length)
            }  while (usedSongNames.includes(currentSong.name) && usedSongNames.length != songLen)
            usedSongNames.push(currentSong.name); 
            playSong(currentSong.path);
        }} else {
            alert('No songs found!');
        }
    })
    .catch(error => console.error('Error fetching songs:', error));
}
  }

function playSong(songPath) {


    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = songPath;

    audioPlayer.volume = 0.1;
    audioPlayer.setAttribute('controlsList', 'nodownload');

    // Add an event listener for the timeupdate event
    audioPlayer.addEventListener('timeupdate', function(event) {
        if (event.target.currentTime > playbackTime) {
            event.target.pause();
            event.target.currentTime = 0;
        }
    });
    
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

function removeSong(song)
{
    let songIndex = songNames.indexOf(song)
    songNames.splice(songIndex,1)
    console.log(song + " eliminat")
    if (songNames.length > 0) {
        var randomIndex = Math.floor(Math.random() * songNames.length);
        currentSong = songNames[randomIndex];
    }
    
}
//take the logic from fetchandplay and put it into playrandom

function checkGuess() {
    const correctAnswer = currentSong.name.toLowerCase();
    const userGuess = guessInput.value.trim().toLowerCase();
    const resultText = document.getElementById('resultText');
   

    if (userGuess === correctAnswer) {
        resultText.textContent = 'Congratulations! You guessed the song correctly.';
        console.log(songNames)
        removeSong(currentSong.name)
        //playSong ("./songs/" + currentSong + ".mp3")
        score++;
        fetchSongsAndPlayRandom()
    }else if(strikes<3) {
        strikes++; // Increment the number of strikes

        if (strikes === 3) {    
            // Show a popup with the game over message
            alert('Game Over. You have reached 3 strikes.' + ' The song was : ' + currentSong.name);
            // Restart the game
            startGame();
            return;
        } else {
            // If not the third strike, add 10 seconds to playbackTime
            playbackTime += 5;
            // Redisplay the result text with remaining strikes
            resultText.textContent = 'Sorry, incorrect guess. You have ' + (3 - strikes) + ' strikes remaining.';
        }
    }
   
}

// Start the game when the page loads   
window.onload = startGame;