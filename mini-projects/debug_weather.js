import https from "https";

console.log("Testing open-meteo API...");

// Test geocoding API
const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=Surat&count=1&language=en&format=json`;

https.get(searchUrl, (response) => {
    let data = '';
    console.log("Geocoding API Status:", response.statusCode);
    
    response.on('data', (chunk) => {
        data += chunk;
    });
    
    response.on('end', () => {
        try {
            const result = JSON.parse(data);
            console.log("Geocoding result:", JSON.stringify(result, null, 2));
            
            if (result.results && result.results.length > 0) {
                const city = result.results[0];
                console.log(`\nCity found: ${city.name}, ${city.country}`);
                console.log(`Coordinates: ${city.latitude}, ${city.longitude}`);
                
                // Now fetch weather
                const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&temperature_unit=celsius`;
                
                https.get(weatherUrl, (weatherRes) => {
                    let weatherData = '';
                    console.log("\nWeather API Status:", weatherRes.statusCode);
                    
                    weatherRes.on('data', (chunk) => {
                        weatherData += chunk;
                    });
                    
                    weatherRes.on('end', () => {
                        const weather = JSON.parse(weatherData);
                        console.log("Weather data:", JSON.stringify(weather.current, null, 2));
                    });
                });
            }
        } catch (e) {
            console.error("Error parsing response:", e.message);
        }
    });
}).on('error', (error) => {
    console.error("Error:", error.message);
});
