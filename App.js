import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&appid=YOUR_API_KEY&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setWeather(null);
    }
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <button type="submit">Get Weather</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <p>Temperature: {weather.main.temp}°C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
