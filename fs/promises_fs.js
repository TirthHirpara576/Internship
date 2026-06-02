// Lec- 14 :- FS module with Promises in Node.js

const fs = require("fs/promises"); // Now, we don't need to write fs.promises every time, we can directly use fs.writeFile, fs.readFile, etc.
const path = require("path");

const fileName = "fsPromises.txt";
const filePath = path.join(__dirname, fileName);

// Why .then() and .catch()?
//? .then() ensures clear chaining of multiple asynchronous operations.
//? .catch() centralizes error handling, making it easy to debug and manage failures.
//*-------------------------------------------------------------------------------------*

// const dirPath = __dirname;
// fs.readdir(dirPath) 
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err)); // either promise fulfilled or rejected, accordingly .then() or .catch() will be executed

//*-------------------------------------------------------------------------------------*
//* The writeFile() method writes data to a file asynchronously.
//* If the file does not exist, it is created.
//* If it exists, its content is replaced.
//! syntax: fs.promises.writeFile(path, data, options).then().catch();
//? options: Encoding ('utf8'), flags, etc. (optional).
//*-------------------------------------------------------------------------------------*

// fs.writeFile(filePath, "this is the initial data", "utf-8")
//   .then(console.log("File created successfully!"))
//   .catch((err) => console.log(err));

//*-------------------------------------------------------------------------------------*
//* Read (Read a File): readFile()
//* The readFile() method reads data from a file.
//* It can return the data as a Buffer or string based on the encoding provided.
//! syntax: fs.promises.readFile(path, options).then(data => ...).catch(err => ...);
//? options: Encoding ('utf8') or no encoding for binary data.
//*-------------------------------------------------------------------------------------*

// fs.readFile(filePath, "utf-8")
//   .then((data) => console.log(data))
//   .catch((err) => console.error("Error reading file:", err));

//*-------------------------------------------------------------------------------------*
//* Update (Append Content to a File): appendFile()
//* Adds content to the end of a file.
//* The appendFile() method adds content without overwriting the existing data.
//! syntax: fs.promises.appendFile(path, data, options).then().catch();
//? options: Encoding ('utf8') or no encoding for binary data.
//*-------------------------------------------------------------------------------------*

// fs.appendFile(filePath, "\nthis is the updated data", "utf-8")
//   .then(console.log("File updated successfully!"))
//   .catch((err) => console.log(err));

//*-------------------------------------------------------------------------------------*
//* Delete (Remove a File): unlink()
//* Deletes a file from the filesystem.
//* The unlink() method removes the specified file asynchronously.
//! syntax: fs.promises.unlink(path).then().catch();
//*-------------------------------------------------------------------------------------*

// fs.unlink(filePath)
//   .then(console.log("File Deleted successfully!"))
//   .catch((err) => console.error("Error deleting file:", err));