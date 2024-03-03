// cookie based auth tutorial
// the code structure and implementation are not recommended for production use

import React, { useState } from "react";
import axios from "axios";

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

const api = "http://localhost:5168";

const App: React.FC = () => {
  const [weatherForecast, setWeatherForecast] = useState<WeatherForecast[]>([]);

  const handleLogin = () => {
    fetch(`${api}/api/Auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => console.log(response));
  };

  const handleLogout = () => {
    fetch(`${api}/api/Auth/logout`, {
      method: "GET",
      credentials: "include",
    }).then((response) => console.log(response));
  };

  const handleFetchWeatherForecast = () => {
    axios
      .get(`${api}/WeatherForecast`, { withCredentials: true })
      .then((response) => setWeatherForecast(response.data))
      .catch((error) =>
        console.error("Error fetching weather forecast", error)
      );
  };

  return (
    <div className="app-container">
      <header>
        <h1>Simple Authentication App</h1>
      </header>
      <div className="user-container">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="login-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="weather-container">
        <button
          className="fetch-weather-btn"
          onClick={handleFetchWeatherForecast}
        >
          Fetch Weather Forecast
        </button>
        <ul>
          {weatherForecast.map((forecast, index) => (
            <li key={index}>
              <p>Date: {forecast.date}</p>
              <p>Temperature (C): {forecast.temperatureC}</p>
              <p>Temperature (F): {forecast.temperatureF}</p>
              <p>Summary: {forecast.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
