// Lec-16 :- Model View Controller (MVC) pattern 
/*
import { readFile, writeFile } from 'fs/promises';
import path, { join } from 'path';

const DATA_FILE = path.join("data", 'links.json');
export const loadLinks = async () => { // this function will read the links.json file and return the data in JSON format. This function will be used to load all the existing links from the links.json file.
    try {
        const data = await readFile(path.join("data", 'links.json'), 'utf-8'); // we will read the links.json file from the data folder and we will specify the encoding as 'utf-8' to get the data in string format
        return JSON.parse(data); // convert this JSON string data into JSON object.
    }
    catch(err) {
        if(err.code === 'ENOENT') { // if "Error No Entry" occurs, which means that the links.json file does not exist, then we will return an empty array as there are no links to load.
            await writeFile(DATA_FILE , JSON.stringify({})); // we will create a new links.json file in the data folder and we will write an empty Object in it as there are no links to load.
            return {}; // and we will return an empty Object as there are no links to load.
        }
        throw err; // if any other error occurs then we will throw the error to be handled by the caller function.
    }
};
export const saveLinks = async (links) => { // this function will save the updated links object back to the links.json file. This function will be used to save the new link to the links.json file.
    await writeFile(path.join("data", 'links.json'), JSON.stringify(links)); // we will write the updated links object to the links.json file in the data folder by converting JSON formate.
}
*/



// Lec-55 :- ExpressJS + MongoDB in our URL_Shortener_Project
/*
import { dbClient } from "../config/db_client.js";
import { env } from "../config/env.js";

// Create a databse
const db = dbClient.db(env.MONGODB_DATABASE_NAME);
// Create collection
const shortenerCollection = db.collection("shorteners");

// get existing "url":"shortCode" from our database
export const loadLinks = async () => {
    return shortenerCollection.find().toArray(); // return array of documents from our database
};
// when user add new shortend_url & click "Shorten" Button -> Then, we have to add that data in our database
export const saveLinks = async (link) => {
    return shortenerCollection.insertOne(link);
};
// Find this "shortCode" is present in our database or not?
export const getLinkByShortCode = async (shortCode) => {
    return await shortenerCollection.findOne({ shortCode:shortCode });
};
*/



// Lec-63 :- Backend URL_Shortener_Project MYSQL+ExpreeJS & Frontend : EJS + CSS
import { db } from "../config/db_client.js";

export const loadLinks = async () => { // get the all existing data from table from database
    const [rows] = await db.execute(`SELECT * FROM short_links`);
    return rows;
};
// when user add new shortend_url & click "Shorten" Button -> Then, we have to add that data in table in database
export const saveLinks = async ({url,shortCode}) => {
    const [result] = await db.execute(
        `INSERT INTO short_links (short_code, url) VALUES (?, ?)`,
        [shortCode, url]
    );
    return result;
};
// Find this "shortCode" is present in our database or not?
export const getLinkByShortCode = async (shortCode) => {
    const [rows] = await db.execute(`SELECT * FROM short_links WHERE short_code = ?` , [shortCode]);
    if(rows.length > 0) return rows[0];
    else return null;
};