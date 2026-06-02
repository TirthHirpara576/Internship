// Lec-18 :- Streams & Buffers in NodeJS (to run :- $cd streams , $node app.js)
import {createReadStream, createWriteStream} from "fs";
import path from "path";

const inputFilePath = path.join(import.meta.dirname, "input.txt");
const outputFilePath = path.join(import.meta.dirname, "output.txt");

// read chunk of data from "input.txt"
const readable_stream = createReadStream(inputFilePath , { 
    encoding:"utf-8", 
    highWaterMark:16, // assume, 16 chars one by one as a chunk.
}); 

// create output file so that, we can paste (chunk of readable_stream) to that output file.
const writeable_stream = createWriteStream(outputFilePath); 

// How to add data one by one in outputFilePath ?
// readable_stream.pipe(writeable_stream); // .pipe() -> connect both files

// OR (How it work -> shown in details)
// Listen for data chunks
readable_stream.on("data", (chunk) => {
    console.log("Buffer(chunk) : ",Buffer.from(chunk)); // convert chunk to a buffer
    console.log("Received chunk : ",chunk); // logs each 16-bytes chunk
    writeable_stream.write(chunk); // Write each chunk to output file
});
// Handle stream end
readable_stream.on("end", () => {
    console.log("File read completed.");
    writeable_stream.end();
});

// Handle errors :-
readable_stream.on("error" , (err) => console.error("Error : ",err));
writeable_stream.on("error" , (err) => console.error("Error : ",err));
