// Lec-21 :- ES Modules (import-export) in Node.js (Using ES Modules :- Add "type": "module" in package.json file)

// 1] Default export :-
// import Addition from "./math.js";
// console.log(Addition(5, 10));

// 2] Named export :-
// import { add, sub, mul, div, PI } from "./math.js";
// console.log(add(1, 10));
// console.log(mul(70, 10));
// console.log(sub(5, 10));
// console.log(div(50, 10));
// console.log(PI);
// OR 
import * as math from "./math.js";
console.log(math.add(1, 10));
console.log(math.mul(70, 10));
console.log(math.sub(5, 10));
console.log(math.div(50, 10));
console.log(math.PI);

