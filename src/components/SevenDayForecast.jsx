import React, { useState, useEffect } from 'react';
import { fetchSevenDayForecastForCity } from '../domain/weatherService';
import { weatherCodeMapping, weatherIconMapping } from '../domain/constants';
import { formatDate } from '../utils/dateUtils';

function SevenDayForecast({ city, onBackClick }) {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getForecast = async () => {
      setLoading(true);
      const data = await fetchSevenDayForecastForCity(city);
      setForecast(data.daily);
      setLoading(false);
    };
    getForecast();
  }, [city]);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12 text-center">
          <button className="btn btn-link mb-4" onClick={onBackClick}>← Back</button>
          <h1 className="display-4 mb-4">7-Day Forecast for {city.name}</h1>
          {loading ? (
            <p className="lead">Loading forecast...</p>
          ) : forecast ? (
            <div className="row justify-content-center">
              {forecast.time.map((date, index) => (
                <div key={date} className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4">
                  <div className="card shadow-sm h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title">{formatDate(date)}</h5>
                      <p className="card-text display-6 mb-2">
                        {weatherIconMapping[forecast.weathercode[index]]}
                      </p>
                      <p className="card-text lead mb-1">
                        {weatherCodeMapping[forecast.weathercode[index]]}
                      </p>
                      <p className="card-text">
                        High: {forecast.temperature_2m_max[index]}°C
                      </p>
                      <p className="card-text">
                        Low: {forecast.temperature_2m_min[index]}°C
                      </p>
                      <p className="card-text">
                        Rain: {forecast.precipitation_sum[index]} mm
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="lead text-danger">Could not fetch 7-day forecast.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SevenDayForecast;