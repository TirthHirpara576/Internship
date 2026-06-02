// Lec-9 :- path module in NodeJS (To run -> $node path_module.js)

const path = require('path'); // path is a built-in module in Node.js that provides utilities for working with file and directory paths.

// __dirname is a global variable in Node.js that represents the directory name of the current module. It gives the absolute path of the directory containing the currently executing file.
console.log(__dirname);
console.log(__filename); 

// Suppose, I want to store data in this folder structure -> C:\Users\LENOVO\Desktop\Node\data\file.txt
const filePath = path.join(__dirname, 'data', 'file.txt'); // I can use path.join() method to join the directory name and file name to get the absolute path of the file.
console.log(filePath);

const parsePath = path.parse(filePath); // path.parse() method is used to parse a file path into an object containing the root, dir, base, ext, and name properties.
const baseName = path.basename(filePath); // path.basename() method is used to get the file name from the file path.
const dirName = path.dirname(filePath); // path.dirname() method is used to get the directory name from the file path.
const extName = path.extname(filePath); // path.extname() method is used to get the file extension from the file path.
const resolvedPath = path.resolve(filePath); // path.resolve() method is used to get the absolute path of the file. It resolves a sequence of paths or path segments into an absolute path.
// path.separator is a property that provides the platform-specific path segment separator. It is used to separate the segments of a file path. For example, on Windows, the separator is a backslash (\), while on POSIX systems (like Linux and macOS), it is a forward slash (/).
console.log({parsePath,baseName,dirName,extName,resolvedPath,separator : path.sep}); // we can also log all the properties of the parsePath object using object destructuring. Here we are logging the baseName, dirName, extName, and resolvedPath properties of the parsePath object.

