# Gemini Weather Dashboard

This is a small web application that displays current weather conditions for multiple cities side-by-side. It provides temperature, wind speed, weather condition, chance of rain, and a witty recommendation based on the weather.

## Underlying Tech Stack

*   **Frontend:** React (JavaScript)
*   **Build Tool:** Vite
*   **Styling:** Bootstrap
*   **Weather Data API:** Open-Meteo (free, public API)

## How it was Created

This application was built interactively with the help of a Gemini-powered CLI agent. The development process involved:

1.  **Project Setup:** Initializing a new React project with Vite and integrating Bootstrap for UI.
2.  **Feature Development:** Implementing weather data fetching from the Open-Meteo API, displaying key weather metrics, and adding a city selection dropdown.
3.  **UI/UX Enhancements:** Beautifying the user interface with Bootstrap cards, prominent temperature display, and weather icons. The browser tab title and favicon were also customized.
4.  **Refactoring:** Restructuring the codebase using a Domain-Driven Design (DDD) approach to improve maintainability and organization. This involved creating separate modules for constants, city data, weather service logic, and recommendation engine, as well as a dedicated `WeatherCard` component.
5.  **Witty Recommendations:** Adding a logic to provide humorous and relevant recommendations based on the current weather conditions for each city.
6.  **Deployment:** Pushing the project to a GitHub repository.

This project demonstrates a step-by-step development process guided by an AI assistant, showcasing rapid prototyping and iterative development.