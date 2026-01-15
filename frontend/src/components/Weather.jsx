const WeatherCard = ({ data }) => {
  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      width: "300px",
      marginTop: "20px"
    }}>
      <h2>{data.name}</h2>
      <p>Temperature: {data.temperature}°C</p>
      <p>Feels Like: {data.feelsLike}°C</p>
      <p>Humidity: {data.humidity}%</p>
      <p>Wind Speed: {data.windSpeed} m/s</p>
      <p>Description: {data.description}</p>
    </div>
  );
};

export default WeatherCard;
