// Lec-58 :- ExpressJS + Mongoose in our URL_Shortener_Project
import mongoose from "mongoose";
import { ur } from "zod/v4/locales";

const urlSchema = mongoose.Schema({
    url: {type:String},
    shortCode: {type:String, required: true, unique: true,},
});

// create model(kind of collection)
export const urls = mongoose.model("url", urlSchema); // < singular model name , schema name >


