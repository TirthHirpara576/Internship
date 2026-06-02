// Lec-29 :- CLI file creation App using NodeJS

import readline from "readline";
import fs from "fs";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const fileCreation = () => {
    rl.question("Enter the file name (in .txt format): ", (fileName) => {
        rl.question("Enter the content for the file: ", (content) => {
            fs.writeFile(fileName, content, (err) => { // This method writes data to a file. If the file does not exist, it will be created. If it does exist, it will be overwritten.
                if (err) console.error("Error writing to file:", err);
                else console.log(`File "${fileName}" created successfully!`);
                rl.close(); // Close the readline interface after the operation is complete
            });
        });
    });
}
fileCreation(); 