
function Weathercard({ weather }) {
  if (!weather) return null;

  return (
    <div className="weather-card">

      <h2>
        {weather.name}, {weather.sys.country}
      </h2>

      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />

      <p className="condition">
        {weather.weather[0].description}
      </p>

      <h1>{Math.round(weather.main.temp)}°C</h1>

      <p>
        Feels Like: {Math.round(weather.main.feels_like)}°C
      </p>

      <div className="weather-details">

        <div className="detail">
          <h3>💧 Humidity</h3>
          <p>{weather.main.humidity}%</p>
        </div>

        <div className="detail">
          <h3>💨 Wind Speed</h3>
          <p>{weather.wind.speed} m/s</p>
        </div>

        <div className="detail">
          <h3>🌡️ Pressure</h3>
          <p>{weather.main.pressure} hPa</p>
        </div>

      </div>
    </div>
  );
}

export default Weathercard;
