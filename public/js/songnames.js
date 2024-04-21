// songPrinter.js

function printSongNames() {
    fetch('./songs.json') // Use relative path to fetch songs.json
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.status + ' ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const songNames = data.songs.map(song => song.name);
            console.log('Song names:');
            songNames.forEach(name => console.log(name));
        })
        .catch(error => console.error('Error fetching and printing song names:', error));
}

// Call printSongNames when the page loads
window.onload = printSongNames;
