import { useEffect, useRef, useState } from "react";
import { getWeather } from "../api/weather";
import Weather from "../components/Weather";
import "../styles/weather.css"; // CSS themes
import { createRain } from "../effects/RainCanvas";
import { createSnow } from "../effects/SnowCanvas";
import { light } from "../effects/Light";

const Home = () => {
  const mountRef = useRef(null);
  const canvasRef = useRef(null);
  const lightRef = useRef(null);

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("day-clear"); // default

  const [effectLoop, setEffectLoop] = useState(null);

  const applyTheme = (main, description) => {
    const hour = new Date().getHours();
    const isNight = hour >= 19 || hour < 6;

    // Theme mapping logic
    if (main === "Clear") {
      setTheme(isNight ? "night-clear" : "day-clear");
    } else if (main === "Clouds") {
      setTheme(isNight ? "night-clouds" : "day-clouds");
    } else if (main === "Rain") {
      setTheme(isNight ? "night-rain" : "day-rain");
    } else if (main === "Snow") {
      setTheme(isNight ? "night-snow" : "day-snow");
    } else if (main === "Thunderstorm") {
      setTheme(isNight ? "night-rain" : "day-rain");
      lightningFlash(lightRef.current);
    } else {
      setTheme(isNight ? "night-clear" : "day-clear");
    }
  };

  const runWeatherEffect = (main) => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // 1. Stop previous animation loop
  if (effectLoop) cancelAnimationFrame(effectLoop);

  // 2. Clear previous particles
  ctx.clearRect(0, 0, width, height);

  let loopId = null;

  if (main === "Rain") {
    const rain = createRain(ctx, width, height);
    const loop = () => {
      rain.draw();
      loopId = requestAnimationFrame(loop);
      setEffectLoop(loopId);
    };
    loop();
  }

  else if (main === "Snow") {
    const snow = createSnow(ctx, width, height);
    const loop = () => {
      snow.draw();
      loopId = requestAnimationFrame(loop);
      setEffectLoop(loopId);
    };
    loop();
  }

  else {
    // No special effect (Clear / Clouds)
    ctx.clearRect(0, 0, width, height);
    setEffectLoop(null);
  }
};


  const handleSearch = async () => {
    try {
      const res = await getWeather(city);
      const data = res.data;

      setWeather(data);
console.log("MAIN:", data.main, "| DESCRIPTION:", data.description);
applyTheme(data.main, data.description);
runWeatherEffect(data.main);

    } catch (err) {
      alert("City not found!");
    }
  };

  return (
    <>
      <div className={`weather-wrapper ${theme}`} ref={mountRef}></div>

      {(theme.includes("day-clear") || theme.includes("day-clouds")) && (
        <div className="sun-glow"></div>
      )}

      {(theme.includes("night-clear") || theme.includes("night-clouds")) && (
        <div className="moon-glow"></div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      <div
        ref={lightRef}
        className="lightning-overlay"
      />

      <div style={{ padding: "30px", position: "relative", zIndex: 20 }}>
        <h1>Weather App</h1>

        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ padding: "10px", marginRight: "10px" }}
        />

        <button onClick={handleSearch} style={{ padding: "10px" }}>
          Search
        </button>

        {weather && <Weather data={weather} />}
      </div>
    </>
  );
};

export default Home;