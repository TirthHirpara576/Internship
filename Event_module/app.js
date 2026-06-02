// Lec-16 :- Event Module in Node.js :- Used to create and handle custom events in Node.js.

const EventEmitter = require("events"); // Import EventEmitter class
const emitter = new EventEmitter(); // Create an instance of EventEmitter
 
/* 1. Define an event listener (addListener)
emitter.on("greet", () => {
  console.log(`hello Tirth Hirpara`);
});
// 2. Trigger(emit)(call) the "greet" event
emitter.emit("greet");
*/


/* You can also pass arguments while emitting. 
emitter.on("greet", (username, prof) => {
  console.log(`hello ${username}, You are a ${prof}.`);
});
emitter.emit("greet", "Tirth Hirpara", "Full Stack Dev");
*/


/* but it's best idea to take a single argument as an object. */
emitter.on("greet", (arg) => {
  console.log(`hello, ${arg.username}, You are a ${arg.prof}.`);
});
emitter.emit("greet", { username: "Tirth Hirpara", prof: "Full Stack Dev" });
