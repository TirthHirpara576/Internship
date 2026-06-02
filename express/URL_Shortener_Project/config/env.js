// Lec-55 :- ExpressJS + MongoDB in our URL_Shortener_Project
/*

import { z } from "zod";
import 'dotenv/config';

// Validate .env file with the help of "zod"
export const env = z.object({ 
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string(),
  MONGODB_DATABASE_NAME: z.string(),
}).parse(process.env); // .parse() method is used to validate the environment variables against the defined schema. If any of the environment variables are missing or do not match the expected type, an error will be thrown, preventing the application from starting with invalid configuration.
*/


// Lec-58 :- ExpressJS + Mongoose in our URL_Shortener_Project
/* 
import { z } from "zod";
import 'dotenv/config';

export const env = z.object({ 
  PORT: z.coerce.number().default(3000),
  MONGODB_URI: z.string(),
}).parse(process.env);
*/



// Lec-63 :- Backend URL_Shortener_Project MYSQL+ExpreeJS & Frontend : EJS + CSS
/* 
import { z } from "zod";
import 'dotenv/config';

// Validate .env file with the help of "zod"
export const env = z.object({ 
  PORT: z.coerce.number().default(3000),
  DATABASE_HOST : z.string(),
  DATABASE_USER : z.string(),
  DATABASE_PASSWORD : z.string(),
  DATABASE_NAME : z.string(),
}).parse(process.env);
*/

// Lec-67 :- URL_Shortener_Project using Drizzle ORM (with MYSQL)
/*
import { z } from "zod";
import dotenv from "dotenv";
dotenv.config();

export const env = z.object({
  DATABASE_HOST: z.string(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  DATABASE_PORT: z.string().optional(),
}).parse(process.env);
*/



// Lec-121 :- Complete Login with Google
// Lec-122 :- Complete Login with Github

import { z } from "zod";

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
  FRONTEND_URL: z.string().url().trim().min(1),
});

export const env = envSchema.parse(process.env);