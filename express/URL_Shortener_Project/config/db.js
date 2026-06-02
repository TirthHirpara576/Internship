// Lec-67 :- URL_Shortener_Project using Drizzle ORM (with MYSQL)

import { drizzle } from "drizzle-orm/mysql2";

// create connection with MYSQL server
export const db = drizzle(process.env.DATABASE_URL); 