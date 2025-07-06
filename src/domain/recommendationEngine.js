export const getRecommendation = (weather) => {
  if (!weather) return "";

  const { temperature, precipitation_probability, weathercode, windspeed } = weather;

  if (precipitation_probability > 50) {
    return "Don't forget your umbrella! Unless you enjoy being soggy.";
  }

  if (temperature < 10) {
    return "Time to bundle up! It's sweater weather.";
  }

  if (temperature > 25) {
    return "Stay cool and hydrated! It's a scorcher out there.";
  }

  if (windspeed > 20) {
    return "Hold onto your hats! It's a bit breezy.";
  }

  if (weathercode === 0) {
    return "Enjoy the sunshine! But don't forget your sunblock, you glow-worm.";
  }

  return "Perfect weather for... whatever you like!";
};
