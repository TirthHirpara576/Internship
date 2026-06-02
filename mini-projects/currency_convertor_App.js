// Lec-31 :- Currency Convertor App

import https from "https"; // To deal with API calls
import readline from "readline"; // CLI
import chalk from "chalk"; // To add colors to the CLI

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const API_KEY = "1eeccfb59edc61c8c944107e";
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

// Function to fetch exchange rates from API    
https.get(url, (res) => {
    let data = "";
    res.on("data", (chunk) => {
        data += chunk;
    });
    res.on("end", () => {
        const exchangeRates = JSON.parse(data).conversion_rates;
        // console.log(exchangeRates);
        rl.question(chalk.blue("Enter the amount in USD: "), (amount) => {
            rl.question(chalk.blue("Enter the target currency (e.g.,INR, EUR, NPR): "), (currency) => {
                const rate = exchangeRates[currency.toUpperCase()]; // 1 USD = ? currency in INR
                if(rate){
                    const convertedAmount = (amount * rate).toFixed(2);
                    console.log(chalk.green(`${amount} USD is approximately ${convertedAmount} ${currency.toUpperCase()}`));
                } 
                else{
                    console.log(chalk.red("Invalid currency code. Please try again."));
                }
                rl.close();
            }); 
        });
    });
});