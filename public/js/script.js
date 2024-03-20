// Fetch data from the API endpoint exposed by db.js
async function fetchDataFromAPI() {
  try {
      const response = await fetch('http://localhost:3025/api/movies'); // Assuming db.js is running on localhost:3000
      const movies = await response.json();
      console.log('Movies:', movies);
      displayMovies(movies);
  } catch (error) {
      console.error('Error fetching data from API:', error);
  }
}

// Display movies in the HTML table
function displayMovies(movies) {
  const tableBody = document.getElementById('movies-table-body');

  movies.forEach(movie => {
      const row = document.createElement('tr');

      const titleCell = document.createElement('td');
      titleCell.textContent = movie.title;
      row.appendChild(titleCell);

      const plotCell = document.createElement('td');
      plotCell.textContent = movie.plot;
      row.appendChild(plotCell);

      // Add more cells for additional movie properties as needed

      tableBody.appendChild(row);
  });
}

fetchDataFromAPI();
