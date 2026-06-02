// Lec-30 :- Random Joke Generator using Real-Time API
import https from "https"; // This module provides a way to make HTTP requests. We will use it to fetch jokes from the API.
import chalk from "chalk"; // This module allows us to style our terminal output with colors and other formatting options.

const getJoke = () => {
    const url = "https://official-joke-api.appspot.com/random_joke"; // This is the URL of the API that provides random jokes.
    https.get(url, (res) => { // This method makes a GET request to the specified URL. The callback function is called when the response is received.
        let data = "";
        res.on("data", (chunk) => { // This "data" event is trigger when a chunk of data is received. We concatenate the chunks to form the complete response.
            data += chunk;
        });
        res.on("end", () => { // This "end" event is trigger when the entire response has been received from the server. We parse the data and display the joke.
            const joke = JSON.parse(data); // This method parses a JSON string and returns a JavaScript object.
            console.log(chalk.green(`Here's a random ${joke.type} joke for you:`)); // Using chalk to color the output
            console.log(chalk.red(joke.setup));
            console.log(chalk.blue.bgRed.bold(joke.punchline));
        });
    }).on("error", (err) => { // This event is emitted if there is an error with the request.
        console.error("Error fetching joke:", err);
    });
}

getJoke(); // Call the function to fetch and display a random joke