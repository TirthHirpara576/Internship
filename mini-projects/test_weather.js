import https from "https";

const city = "Surat";
const weatherUrl = `https://wttr.in/${city}?format=j1`;

https.get(weatherUrl, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
        data += chunk;
    });
    
    response.on('end', () => {
        console.log('Status Code:', response.statusCode);
        console.log('Response length:', data.length);
        console.log('First 300 chars:', data.substring(0, 300));
        
        if (response.statusCode === 200) {
            try {
                const weatherData = JSON.parse(data);
                const currentCondition = weatherData.current_condition[0];
                const location = weatherData.nearest_area[0];
                console.log('City:', location.areaName[0].value);
                console.log('Temperature:', currentCondition.temp_C);
            } catch (e) {
                console.error('JSON parse error:', e.message);
            }
        }
    });
}).on('error', (error) => {
    console.error("Error:", error.message);
});
