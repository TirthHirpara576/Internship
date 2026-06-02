// Lec-3 :- env variables validation using ZOD library in ExpressJS. (app.js , env.js)
// To run this file only :- $node --watch env.js & in browser :- http://localhost:3000/

import { z,ZodError } from 'zod';

/*
const ageSchema = z.number().min(18).max(60).int(); // age should be int between 18 and 60
const userAge = 19;

// try {
//     const parseUserAge = ageSchema.parse(userAge); // parse() method is used to validate the data against the schema. If the data is valid, it returns the parsed data. If the data is invalid, it throws a ZodError with details about the validation errors.
//     console.log(parseUserAge); // Output := { success: false, error: ZodError: [ZodError: Number must be greater than or equal to 18] }
// } catch (error) {
//     if(error instanceof ZodError) { // instanceof is a javaScript operator that checks if an object is an instance of a specific class or constructor function. In this case, we are checking if the error object is an instance of ZodError, which is the error class used by the Zod library to represent validation errors.
//         console.log(error.issues[0].message); // Output := "Too small: expected number to be >=18"
//     }
//     else {
//         console.log("Unexpected error:", error);
//     }
// }

// OR using safeParse() method to validate env variables
const {data,error,success} = ageSchema.safeParse(userAge); // safeParse() method is used to validate the data against the schema. If the data is valid, it returns an object with success: true and the parsed data. If the data is invalid, it returns an object with success: false and error details.
console.log(data); // Output := 19
console.log(error); // Output := ZodError: [ZodError: Number must be less than or equal to 60] OR undefined if the data is valid
console.log(success); // Output := false/true
*/

const portSchema = z.coerce.number().min(1).max(65535).default(3000); // port should be a number between 1 and 65535, if it is not provided, it will be set to 3000 by default. coerce() method is used to convert the string value of PORT to a number before validation.
export const PORT = portSchema.parse(process.env.PORT); // parse() method is used to validate the data against the schema. If the data is valid, it returns the parsed data. If the data is invalid, it throws a ZodError with details about the validation errors.