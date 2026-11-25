function Forecast({ forecast }) {
  return (
    <div className="forecast-section">
      <h2>5 Days Weather Forecast</h2>

      <div className="forecast-list">
        {forecast.map((item) => (
          <div className="forecast-card" key={item.dt}>
            <h3>
              {new Date(item.dt_txt).toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </h3>

            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />

            <h2>{Math.round(item.main.temp)}°C</h2>
            <p>{item.weather[0].description}</p>
            <p>Humidity: {item.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;