import './App.css';
import React, { useState } from 'react';

const api = {
  key: 'e0f6c7d3233354ad9e4c801b63dbd63f',
  base: 'https://api.openweathermap.org/data/2.5',
};

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const searchPressed = () => {
    fetch(`${api.base}/weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch weather data');
        }
        return res.json();
      })
      .then((result) => {
        if (result.cod === 200) {
          setWeather(result);
          setError('');
        } else {
          setError(result.message || 'Unknown error occurred');
          setWeather(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching the weather data:", error);
        setError("Error fetching the weather data");
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div>
          <input
            type="text"
            placeholder="Search.."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={searchPressed}>Search</button>
        </div>

        {error && <p>{error}</p>}
        {weather && (
          <div>
            <p>{weather.name}, {weather.sys.country}</p>
            <p>{Math.round(weather.main.temp)} °C</p>
            <p>{weather.weather[0].main}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
