// script.js

document.getElementById('playButton').addEventListener('click', function() {
  playRandom()
});

function fetchSongsAndPlayRandom() {
  fetch('./songs.json') // Adjusted fetch URL to point directly to the songs.json file
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
      }
      return response.json();
  })
  .then(data => {
      var songs = data.songs;
      if (songs.length > 0) {
          console.log(songs)
          var randomIndex = Math.floor(Math.random() * songs.length);
          var randomSong = songs[randomIndex];
          var audioPlayer = document.getElementById('audioPlayer');
          audioPlayer.src = randomSong.path;
          audioPlayer.play();
      } else {
          alert('No songs found!');
      }
  })
  .catch(error => console.error('Error fetching songs:', error));
}


