export const fetchWeatherForCity = async (city) => {
  try {
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
  } catch (error) {
    console.error("Error fetching weather data for " + city.name + ": ", error);
    return { name: city.name, error: "Could not fetch data." };
  }
};
