// Lec-32 :- Weather App

// import https from "https";
import readline from "readline/promises"; // Using promises for better async handling
import chalk from "chalk";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getWeather = async (city) => {
    const API_KEY = "0f0db85619597f8a66b7477dbe7e219d"; // OpenWeatherMap's free API key for testing
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;  // URL for the specified city

    try {
        const response = await fetch(weatherUrl); // Fetch weather data

        if(response.ok) {
            const weatherData = await response.json(); // convert response to JSON

            console.log(`\nWeather Information :-`);
            console.log(chalk.green(`City: ${weatherData.name}`));
            console.log(chalk.green(`Temperature: ${weatherData.main.temp} °C`));
            console.log(chalk.green(`Weather: ${weatherData.weather[0].description}`));
            console.log(chalk.green(`Humidity: ${weatherData.main.humidity}%`));
            console.log(chalk.green(`Wind Speed: ${weatherData.wind.speed} m/s`));
        } 
        else {
            console.log(chalk.red(`Could not fetch weather data for ${city}. Please check the city name and try again.`));
        }
    } 
    catch(error) {
        console.error(chalk.red("An error occurred while fetching weather data:", error)); // Handle network or other errors
    }
};

const city = await rl.question(
    chalk.blue("Enter the city name to get the weather information: ")
);  // Get city name from user

await getWeather(city);
rl.close();
