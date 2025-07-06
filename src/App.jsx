import React, { useState, useEffect } from 'react';

const cities = [
  { name: 'Ajmer', latitude: 26.4499, longitude: 74.6399 },
  { name: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
  { name: 'Bhopal', latitude: 23.2599, longitude: 77.4126 },
  { name: 'Mountain View', latitude: 37.3861, longitude: -122.0839 },
];

const weatherCodeMapping = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense intensity',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense intensity',
  61: 'Rain: Light',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy intensity',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy intensity',
  71: 'Snow fall: Light',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy intensity',
  77: 'Snow grains',
  80: 'Rain showers: Light',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers: Light',
  86: 'Snow showers: Heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
};

const weatherIconMapping = {
  0: '☀️', // Clear sky
  1: '🌤️', // Mainly clear
  2: '⛅', // Partly cloudy
  3: '☁️', // Overcast
  45: '🌫️', // Fog
  48: '🌫️', // Depositing rime fog
  51: '🌧️', // Drizzle
  53: '🌧️', // Drizzle
  55: '🌧️', // Drizzle
  56: '🌧️', // Freezing Drizzle
  57: '🌧️', // Freezing Drizzle
  61: '🌧️', // Rain
  63: '🌧️', // Rain
  65: '🌧️', // Rain
  66: '🌧️', // Freezing Rain
  67: '🌧️', // Freezing Rain
  71: '🌨️', // Snow fall
  73: '🌨️', // Snow fall
  75: '🌨️', // Snow fall
  77: '🌨️', // Snow grains
  80: '⛈️', // Rain showers
  81: '⛈️', // Rain showers
  82: '⛈️', // Rain showers
  85: '🌨️', // Snow showers
  86: '🌨️', // Snow showers
  95: '⚡', // Thunderstorm
  96: '⚡', // Thunderstorm with hail
  99: '⚡', // Thunderstorm with hail
};

function App() {
  const [allCityWeather, setAllCityWeather] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      try {
        const weatherPromises = cities.map(async (city) => {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=precipitation_probability`
          );
          const data = await response.json();
          return {
            name: city.name,
            temperature: data.current_weather.temperature,
            windspeed: data.current_weather.windspeed,
            weathercode: data.current_weather.weathercode,
            precipitation_probability: data.hourly.precipitation_probability[0],
          };
        });
        const results = await Promise.all(weatherPromises);
        const weatherMap = results.reduce((acc, curr) => {
          acc[curr.name] = curr;
          return acc;
        }, {});
        setAllCityWeather(weatherMap);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setAllCityWeather({});
      } finally {
        setLoading(false);
      }
    };

    fetchAllWeather();
  }, []);

  return (
    <div className="container d-flex flex-column justify-content-center min-vh-100">
      
      {loading ? (
        <p className="lead text-center">Loading weather data...</p>
      ) : (
        <div className="row">
          {cities.map((city) => (
            <div key={city.name} className="col-lg-3 col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body text-center">
                  <h2 className="card-title h4 mb-3">{city.name}</h2>
                  {allCityWeather[city.name] ? (
                    <>
                      <h3 className="display-5 mb-3">
                        {allCityWeather[city.name].temperature}°C {weatherIconMapping[allCityWeather[city.name].weathercode]}
                      </h3>
                      <p className="card-text">Condition: {weatherCodeMapping[allCityWeather[city.name].weathercode]}</p>
                      <p className="card-text">Wind: {allCityWeather[city.name].windspeed} km/h</p>
                      <p className="card-text">Rain Chance: {allCityWeather[city.name].precipitation_probability}%</p>
                    </>
                  ) : (
                    <p className="card-text text-danger">Could not fetch data.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;