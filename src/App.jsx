import Forecast from "./components/Forecast";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Weathercard from "./components/Weathercard";
import "./App.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [inputCity, setInputCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState([]);

  async function getWeather(cityName) {
    try {
      setLoading(true);
      setError("");

      if (!API_KEY) {
        throw new Error("API key is missing. Check your .env file.");
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Invalid API key or activation pending. Please check your OpenWeatherMap key."
          );
        }

        if (response.status === 404) {
          throw new Error("City not found. Please enter a valid city.");
        }

        throw new Error(data.message || "Unable to fetch weather.");
      }

      setWeather(data);
      const forecastResponse = await fetch(
  `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
    cityName
  )}&units=metric&appid=${API_KEY}`
);

const forecastData = await forecastResponse.json();

if (!forecastResponse.ok) {
  throw new Error(forecastData.message || "Forecast not found");
}

const dailyForecast = forecastData.list.filter((item) =>
  item.dt_txt.includes("12:00:00")
);

setForecast(dailyForecast.slice(0, 5));

    } catch (err) {
      setWeather(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeather("Chennai");
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    if (!inputCity.trim()) {
      setError("Please enter a city name.");
      return;
    }

    getWeather(inputCity.trim());
    setInputCity("");
  }

  return (
    <div className="app">
      <Navbar />

      <main className="dashboard">

        <h1>Weather Dashboard 🌦️</h1>
        <p className="subtitle">
          Live Weather Updates Around The World
        </p>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search"
            type="text"
            placeholder="Search city..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            Search
          </button>
        </form>

        {loading && (
          <p className="status">Loading Weather...</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

        {!loading && weather && (
          <>
            <Weathercard weather={weather} />
            <Forecast forecast={forecast} />

            <div className="forecast">
              <h2>🤖 AI Weather Assistant</h2>

              <p>
                {weather.main.temp >= 35
                  ? "It's very hot today! Stay hydrated and avoid prolonged outdoor activities."
                  : weather.main.temp <= 18
                  ? "It's cold today! Wear comfortable warm clothing."
                  : weather.weather[0].main === "Rain"
                  ? "Rain is expected. Consider carrying an umbrella."
                  : "Have a wonderful day! Check the weather before planning outdoor activities."}
              </p>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

export default App;
