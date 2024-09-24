import React, { useState, useEffect } from 'react';

function App() {
  // Using the useState hook for storing weather data and errors
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Setting the fetch options
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    // Fetching weather data
    fetch('https://api.weather.gov/points/38.8894,-77.0352', options)
      .then(response => response.json())
      .then(data => {
        // Set the weather data to state
        setWeatherData(data);
      })
      .catch(err => {
        // Set the error to state if there is an error
        setError(err);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <main>
        {weatherData && (
          <div>
            <h2>Weather Data:</h2>
            <pre>{JSON.stringify(weatherData, null, 2)}</pre>
          </div>
        )}
        {error && <p>Error fetching data: {error.message}</p>}
      </main>
    </ div>
  );
}

export default App;