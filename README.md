# Gemini Weather Dashboard

This is a small web application that displays current weather conditions for multiple cities side-by-side. It provides temperature, wind speed, weather condition, chance of rain, and a witty recommendation based on the weather.

## Getting Started

Follow these steps to get the Gemini Weather Dashboard up and running on your local machine.

### Prerequisites

Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sskelkar/gemini-weather.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd gemini-weather
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be accessible in your web browser at `http://localhost:5173`.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

This will generate optimized static assets in the `dist` directory.

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