// Lec-21 :- ES Modules (import-export) in Node.js

const add = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return a - b;
};

const div = (a, b) => {
  return a / b;
};

const mul = (a, b) => {
  return a * b;
};

const PI = 3.214;

// export default add;
export { add, sub, mul, div, PI };