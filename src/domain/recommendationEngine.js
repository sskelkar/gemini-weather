const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const getRecommendation = async (weather) => {
  if (!weather) return "";

  const { temperature, precipitation_probability, weathercode, windspeed } = weather;

  const weatherDescription = `Temperature: ${temperature}°C, Wind Speed: ${windspeed} km/h, Condition: ${weathercode}, Chance of Rain: ${precipitation_probability}%`;

  const prompt = `Given the following weather conditions: ${weatherDescription}. Provide a witty and relevant recommendation under 15 words.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error: ", errorData);
      return "Could not fetch recommendation.";
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error calling Gemini API: ", error);
    return "Failed to get recommendation.";
  }
};