import React from 'react';
import { weatherCodeMapping, weatherIconMapping } from '../domain/constants';
import { getRecommendation } from '../domain/recommendationEngine';

function WeatherCard({ city, weather }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className="card shadow-sm h-100">
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
              <p className="card-text mt-3 fst-italic">{getRecommendation(weather)}</p>
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
