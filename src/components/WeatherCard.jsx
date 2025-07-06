import React, { useState, useEffect } from 'react';
import { weatherCodeMapping, weatherIconMapping } from '../domain/constants';
import { getRecommendation } from '../domain/recommendationEngine';

function WeatherCard({ city, weather, onCardClick }) {
  const [recommendation, setRecommendation] = useState('');
  const [recLoading, setRecLoading] = useState(false);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (weather) {
        setRecLoading(true);
        const rec = await getRecommendation(weather);
        setRecommendation(rec);
        setRecLoading(false);
      }
    };
    fetchRecommendation();
  }, [weather]);

  return (
    <div className="col-lg-6 col-md-6 mb-4" onClick={() => onCardClick(city)} style={{ cursor: 'pointer' }}>
      <div className="card shadow-sm h-100 transition-shadow-hover" style={{ transition: 'box-shadow 0.3s ease-in-out' }}>
        <div className="card-body text-center">
          <h2 className="card-title h4 mb-3">{city.name}</h2>
          {weather ? (
            <>
              <h3 className="display-5 mb-3">
                {weather.temperature}°C {weatherIconMapping[weather.weathercode]}
              </h3>
              <p className="card-text">Condition: {weatherCodeMapping[weather.weathercode]}</p>
              <p className="card-text">Wind: {weather.windspeed} km/h</p>
              <p className="card-text">Rain Chance: {weather.precipitation_probability}%</p>
              <p className="card-text mt-3 fst-italic">
                {recLoading ? 'Generating recommendation...' : recommendation}
              </p>
            </>
          ) : (
            <p className="card-text text-danger">Could not fetch data.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;