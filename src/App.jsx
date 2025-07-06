import React, { useState, useEffect } from 'react';
import { cities } from './domain/cities';
import { fetchWeatherForCity } from './domain/weatherService';
import WeatherCard from './components/WeatherCard';
import SevenDayForecast from './components/SevenDayForecast'; // Import the new component

function App() {
  const [allCityWeather, setAllCityWeather] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCityDetail, setSelectedCityDetail] = useState(null); // State to hold the city for detailed view

  useEffect(() => {
    const fetchAllWeather = async () => {
      setLoading(true);
      try {
        const weatherPromises = cities.map(async (city) => {
          return await fetchWeatherForCity(city);
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

  const handleCardClick = (cityData) => {
    setSelectedCityDetail(cityData);
  };

  const handleBackClick = () => {
    setSelectedCityDetail(null);
  };

  if (selectedCityDetail) {
    return (
      <SevenDayForecast city={selectedCityDetail} onBackClick={handleBackClick} />
    );
  }

  return (
    <div className="container d-flex flex-column justify-content-center min-vh-100">
      {loading ? (
        <p className="lead text-center">Loading weather data...</p>
      ) : (
        <div className="row">
          {cities.map((city) => (
            <WeatherCard key={city.name} city={city} weather={allCityWeather[city.name]} onCardClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;