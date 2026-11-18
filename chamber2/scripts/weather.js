// Warri, Delta State coordinates
const lat = 5.5544;
const lon = 5.7932;

// IMPORTANT: Insert your own OpenWeatherMap API key below.
const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";

const currentTemp = document.querySelector("#current-temp");
const description = document.querySelector("#weather-description");
const forecast = document.querySelector("#forecast");
const status = document.querySelector("#weather-status");

async function getWeather() {
    if (apiKey === "YOUR_OPENWEATHERMAP_API_KEY") {
        status.textContent = "Add your OpenWeatherMap API key in scripts/weather.js to load live weather data.";
        currentTemp.textContent = "API key required";
        description.textContent = "Live weather data will appear here.";
        forecast.innerHTML = "";
        return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Unable to retrieve weather data.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        currentTemp.textContent = `${Math.round(currentData.main.temp)}°C`;
        description.textContent = currentData.weather[0].description;

        const days = [];
        const seenDates = new Set();

        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];
            if (!seenDates.has(date) && days.length < 3) {
                seenDates.add(date);
                days.push(item);
            }
        });

        forecast.innerHTML = days.map(item => {
            const dayName = new Date(item.dt_txt.replace(" ", "T")).toLocaleDateString(
                "en-US", { weekday: "long" }
            );
            return `<p><strong>${dayName}:</strong> ${Math.round(item.main.temp)}°C</p>`;
        }).join("");

        status.textContent = "";
    } catch (error) {
        currentTemp.textContent = "Unavailable";
        description.textContent = "Weather data could not be loaded.";
        forecast.innerHTML = "";
        status.textContent = error.message;
    }
}

getWeather();
