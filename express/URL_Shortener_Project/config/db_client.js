// Lec-55 :- ExpressJS + MongoDB in our URL_Shortener_Project
/*
import {MongoClient} from "mongodb";
import {env} from "./env.js";

// create instanse :-
export const dbClient = new MongoClient(env.MONGODB_URI);
// To connect client with mongoDB's server (mongodb://localhost:27017)
await dbClient.connect(); // it returns a promises
*/



// Lec-58 :- ExpressJS + Mongoose in our URL_Shortener_Project
/*
import mongoose from "mongoose";
import {env} from "./env.js";

// create mongoose connection 
export const connectDB = async () => {
    try {
        await mongoose.connect(env.MONGODB_URI);
    }
    catch(err){
        console.error(err);
    }
};
*/




// Lec-63 :- Backend URL_Shortener_Project MYSQL+ExpreeJS & Frontend : EJS + CSS

import mysql from "mysql2/promise";
import { env } from "./env.js";  

// to connect with MYSQL server
export const db = await mysql.createConnection({
    host : env.DATABASE_HOST,
    user : env.DATABASE_USER,
    password : env.DATABASE_PASSWORD,
    database : env.DATABASE_NAME,
});