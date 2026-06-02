// Lec-7,8 :- Modules in Node.js  (app.js , math.js)   (To run -> in Terminal write this -> node math.js)
// way-1 = commonJS module system (used in Node.js)
const add = (a, b) => {
    return a + b;
}
module.exports = add; // module.exports is used to export the add function so that it can be used in other files/mod.




// way-2 = Named & Aggregate exports (used in Node.js)
const sub = (a, b) => {
    return a - b;
}
const mul = (a, b) => {
    return a * b;
}
const div = (a, b) => {
    return a / b;
}
const PI = 3.1415;

module.exports = { add, sub, mul, div, PI }; // we can export multiple functions by using an object. Here we are exporting add, sub, mul, div functions as properties of an object. We can import them in other files using destructuring assignment.