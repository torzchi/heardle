const fs = require('fs');
const path = require('path');

const directoryPath = './public/songs'; // Path to the directory containing your songs

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    const songs = files.filter(file => file.endsWith('.mp3')).map(file => ({
        name: path.basename(file, '.mp3'),
        path: './songs/' + file // Adjusted path to be relative to the current directory
    }));

    const jsonContent = { songs };

    fs.writeFile('./public/songs.json', JSON.stringify(jsonContent, null, 2), err => {
        if (err) {
            console.error('Error writing JSON file:', err);
            return;
        }
        console.log('songs.json file has been generated successfully.');
    });
});
