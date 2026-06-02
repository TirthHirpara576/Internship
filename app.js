// Lec-6 :- Global vs window  (To run -> in Terminal write this -> node app.js)
/*

// console.log(global); // Node.js global object
global.console.log("Hello from global!"); 
globalThis.console.log("Hello from globalThis!"); 

console.log(globalThis.process);
globalThis.console.log(module); // module is a global variable in Node.js that provides information about the current module.
// we can't write globalThis.module because module is not a property of globalThis.
// jevi rite react is all about components, tevi rite node is all about modules.

*/



// Lec-7,8 :- Modules in Node.js  (app.js , math.js)   (To run -> in Terminal write this -> node math.js)
// way-1 = commonJS module system (used in Node.js)
/*
const add = require('./math'); 
console.log(add(3,5));
*/


// way-2 = Named & Aggregate exports (used in Node.js)
const { add, sub, mul, div, PI } = require('./math'); // we can import multiple functions by using destructuring assignment. Here we are importing add, sub, mul, div functions from math.js file.
console.log(add(3,5));
console.log(sub(10,4));
console.log(mul(6,7));
console.log(div(20,5));
console.log(PI);
// OR
// const math = require('./math');
// console.log(math.add(3,5));
// console.log(math.sub(10,4));
// console.log(math.mul(6,7));
// console.log(math.div(20,5));
// console.log(math.PI);