// Lec-11 :- Crypto Module in NodeJS
const crypto = require("crypto");

const randomValue = crypto.randomBytes(8).toString("hex");
console.log("Random Bytes : ",randomValue); // It can be used in Token generation in forgot password or in OTP generation. It generates a random value of 16 characters (8 bytes) in hexadecimal format.

const hashValue = crypto
  .createHash("sha256")
  .update("thapa technical") 
  .digest("hex");

console.log("Hash Value for 'thapa technical' : ",hashValue);
// User jyare-jyare 'thapa technical' string ne input ma aapse, tyare-e same hash value generate thase.