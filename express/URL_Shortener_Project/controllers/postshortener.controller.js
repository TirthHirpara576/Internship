// Lec-16 :- Model View Controller (MVC) pattern 
// Lec-17 :- Add EJS in URL_Shortener_Project

/*
import crypto from 'crypto'; // we will use crypto module to generate a random shortcode for the URL
import { readFile } from 'fs/promises';
import path, { join } from 'path';
import { loadLinks,saveLinks } from '../models/shortener.model.js';

export const getShortenerPage = async (req,res) => {
    try{
        const links = await loadLinks(); // we will load all the existing links from the links.json file by calling the loadLinks function. This function will read the links.json file and return the data in JSON format.

        // const file = await readFile(join("views", "index.html")); // to display index.html file whenever user requst for Homepage
        // const content = file.toString().replaceAll("{{ shortened_urls }}",
        //     Object.entries(links).map( ([shortCode,url]) => `<li><a href="/${shortCode}" target="_blank"> ${req.headers.host}/${shortCode} </a> -> ${url}</li> ` ).join("") 
        // );
        // return res.send(content); // Now, we will get all the links from "links.json" into Our Homepage.

        // OR  Lec-17 
        return res.render("index" , {links , host : req.host}); // whenever user hits "/" --> directly render "index.ejs" file. // host -> to get the domain name from the request headers (req.headers.host) and we will pass it to our EJS template so that we can use it to display the full shortened URL in the frontend.
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req,res) => {
    try{
        const {url,shortCode} = req.body; // req.body -> we can easily get "form data" inserted by user.
        // first, check in "links.json", if the same URL is already present (Duplicate data), then we will return the existing shortcode for that URL instead of creating a new shortcode for it.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); // if the user has provided a shortcode then we will use that shortcode, otherwise we will generate a random shortcode using crypto module by generating 4 random bytes and converting it to hexadecimal string format
        const links = await loadLinks(); // we will load all the existing links from the links.json file by calling the loadLinks function. This function will read the links.json file and return the data in JSON format.
        // Now, we already read the existing data from the links.json file --> "links" and we will check if the same URL is already present in the file or not. If it is present then we will return the existing shortcode for that URL, otherwise we will add a new entry for that URL with the generated shortcode in the links.json file.
        if(links[finalShortcode]) { 
            return res.status(400).send("ShortCode already exists. Please choose another shortcode.");
        }

        links[finalShortcode] = url; // we will add a new entry (Object) for that URL with the generated shortcode in the links.json file.
        await saveLinks(links); // we will save the updated links object back to the links.json file by calling the saveLinks function.

        return res.redirect("/"); // whenever form is submitted, rather than redirectting to the another page, redirect to Home page...
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req,res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try{
        const {shortCode} = req.params;
        const links = await loadLinks();

        if(!links[shortCode]) return res.status(404).send("404 Error occurred.");

        return res.redirect(links[shortCode]);
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
}
*/




// Lec-55 :- ExpressJS + MongoDB in our URL_Shortener_Project
/*
import crypto from 'crypto'; // to generate random shortcode.
import { readFile } from 'fs/promises';
import path, { join } from 'path';
import { loadLinks,saveLinks,getLinkByShortCode, } from '../models/shortener.model.js';

export const getShortenerPage = async (req,res) => {
    try{
        const links = await loadLinks(); // Get all links from database and return in JSON format.
        return res.render("index" , {links , host : req.host}); // whenever user hits "/" --> directly render "index.ejs" file. 
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req,res) => {
    try{
        const {url,shortCode} = req.body; // Get form data from frontend (index.ejs file) using req.body.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); 
        const links = await loadLinks(); 
        if(links[finalShortcode]) { // if that shortCode is already exist in our database then return error message to user and ask to choose another shortcode.
            return res.status(400).send("ShortCode already exists. Please choose another shortcode.");
        }

        await saveLinks({url,shortCode});

        return res.redirect("/");
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req,res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try{
        const {shortCode} = req.params;
        
        const link = await getLinkByShortCode(shortCode); // if shortcode is exist in our database Then, we get entire document from our database.
        if(!link) return res.redirect("/404");

        return res.redirect(link.url);
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
}
*/




// Lec-58 :- ExpressJS + Mongoose in our URL_Shortener_Project
/*
import { urls } from '../schema/url_schema.js';
import crypto from 'crypto'; // to generate a random shortcode.


export const getShortenerPage = async (req,res) => {
    try{
        const links = await urls.find(); // using find(), I can get all existing data (documents) from my database
        return res.render("index" , {links , host : req.host}); // whenever user hits "/" --> directly render "index.ejs" file. 
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req,res) => {
    try{
        const {url,shortCode} = req.body; // req.body -> we can easily get "form data" inserted by user.
        // first, check in "links.json", if the same URL is already present (Duplicate data), then we will return the existing shortcode for that URL instead of creating a new shortcode for it.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); // if the user has provided a shortcode then we will use that shortcode, otherwise we will generate a random shortcode using crypto module by generating 4 random bytes and converting it to hexadecimal string format
        const links = await urls.find(); // using find(), I can get all existing data (documents) from my database --> "links" and we will check if the same URL is already present in the file or not. If it is present then we will return the existing shortcode for that URL, otherwise we will add a new entry for that URL with the generated shortcode in the links.json file.
        if(links[finalShortcode]) { 
            return res.status(400).send("ShortCode already exists. Please choose another shortcode.");
        }

        await urls.create({url,shortCode});

        return res.redirect("/"); // whenever form is submitted, rather than redirectting to the another page, redirect to Home page...
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req,res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try{
        const {shortCode} = req.params;
        
        const link = await urls.findOne({shortCode:shortCode}); // if shortcode is exist in our databse Then, we get link (entire document) from our databse 
        if(!link) return res.redirect("/404"); // if that shortCode is not present in our database -> then, redirect to the error page

        return res.redirect(link.url);
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
}
*/





// Lec-63 :- Backend URL_Shortener_Project MYSQL+ExpreeJS & Frontend : EJS + CSS
// Lec-67 :- URL_Shortener_Project using Drizzle ORM (with MYSQL)  (To run : in another powershell ('+') -> $npm run start  , make sure, in package.json => "type": "module"  &  in browser :-  https://local.drizzle.studio)
/*
import crypto from 'crypto'; // we will use crypto module to generate a random shortcode for the URL
import { loadLinks, saveLinks, getLinkByShortCode, } from '../models/shortener.model.js'; // Lec-63
import { getAllShortLinks, getShortLinkByShortCode, insertShortLink } from '../services/shortener.services.js'; // Lec-67

export const getShortenerPage = async (req, res) => {
    try {
        // const links = await loadLinks(); // Lec-63 :- we will load all the existing links from databse by calling the loadLinks function. This function will read databse and return the data in JSON format.
        // OR Lec-67
        const links = await getAllShortLinks();

        return res.render("index", { links, host: req.host, isLoggedIn: req.cookies.isLoggedIn || false }); // whenever user hits "/" --> directly render "index.ejs" file. 
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req, res) => {
    try {
        const { url, shortCode } = req.body;
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); 

        // const link = await getLinkByShortCode(finalShortcode); // Lec-63 :- if shortcode is exist in our databse Then, we gat link = entire document from our databse 
        // OR Lec-67
        const link = await getShortLinkByShortCode(finalShortcode);

        if(link) {
            return res.status(400).send('<h1>ShortCode already exists. Please choose another shortcode. <a href="/">Go Back</a> </h1>');
        }

        // Lec-63 
        // await saveLinks({url,shortCode:finalShortcode}); 
        // OR Lec-67
        await insertShortLink({ url, finalShortcode });

        return res.redirect("/");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req, res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try {
        const { shortCode } = req.params;

        // const link = await getLinkByShortCode(shortCode); // Lec-63 :- if shortcode is exist in our databse Then, we get link = entire document from our databse 
        // OR Lec-67
        const link = await getShortLinkByShortCode(shortCode);

        if (!link) return res.redirect("/404"); // if that shortCode is not present in our database -> then, redirect to the error page

        return res.redirect(link.url);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};
*/




// Lec-71 :- Cookies
// Lec-72 :- cookie-parser middleware
/*
import crypto from 'crypto'; // we will use crypto module to generate a random shortcode for the URL
import { loadLinks,saveLinks,getLinkByShortCode, } from '../models/shortener.model.js';
import { urls } from '../schema/url_schema.js';

export const getShortenerPage = async (req,res) => {
    try{
        const links = await loadLinks(); // we will load all the existing links from databse by calling the loadLinks function. This function will read databse and return the data in JSON format.

        // Lec-71 :- get Cookie
        // let isLoggedIn = false;
        // if (req.headers.cookie) {
        //     const cookies = Object.fromEntries(
        //         req.headers.cookie.split(";").map(c => c.trim().split("="))
        //     );
        //     isLoggedIn = cookies.isLoggedIn === "true";
        // }
        // console.log("isLoggedIn:", isLoggedIn);

        // OR Lec-72
        let isLoggedIn = req.cookies.isLoggedIn;

        return res.render("index" , {links , host : req.host , isLoggedIn}); // whenever user hits "/" --> directly render "index.ejs" file. 
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req,res) => {
    try{
        const {url,shortCode} = req.body; // req.body -> we can easily get "form data" inserted by user.
        // first, check in "links.json", if the same URL is already present (Duplicate data), then we will return the existing shortcode for that URL instead of creating a new shortcode for it.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); // if the user has provided a shortcode then we will use that shortcode, otherwise we will generate a random shortcode using crypto module by generating 4 random bytes and converting it to hexadecimal string format
        const link = await getLinkByShortCode(finalShortcode); // if shortcode is exist in our databse Then, we gat link = entire document from our databse 
        // Now, we will check if the same URL is already present in the file or not. If it is present then we will return the existing shortcode for that URL, otherwise we will add a new entry for that URL with the generated shortcode in our database.
        if(link) { 
            return res.status(400).send('<h1>ShortCode already exists. Please choose another shortcode. <a href="/">Go Back</a> </h1>');
        }

        await saveLinks({url,shortCode:finalShortcode});

        return res.redirect("/"); // whenever form is submitted, rather than redirectting to the another page, redirect to Home page...
    }catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req,res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try{
        const {shortCode} = req.params;
        
        const link = await getLinkByShortCode(shortCode); // if shortcode is exist in our databse Then, we get link = entire document from our databse 
        if(!link) return res.redirect("/404"); // if that shortCode is not present in our database -> then, redirect to the error page

        return res.redirect(link.url);
    }
    catch(error){
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};
*/






/* Lec-81 :- How to create protected route in our ExpressJS application (Do login & Run :- http://localhost:3000/me  & If i delete access_token from inspect->Application->Cookies , then it will render -> "Not Logged In" text)
// Lec-85 :- How to relate "users" table with "short_link" table using Drizzle ORM
// Lec-87 :- ZOD Validation & Edit/Update functionality in URLs and Shortcodes
// Lec-88 :- Delete functionality in URLs and Shortcodes

import crypto from 'crypto'; // we will use crypto module to generate a random shortcode for the URL
import { getAllShortLinks, getShortLinkByShortCode, insertShortLink, findShortLinkById, updateShortCode, deleteShortCodeById, } from '../services/shortener.services.js'; // Lec-67
import z from 'zod'; // Lec-87

export const getShortenerPage = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login"); // User jya sudhi Login No kare, tya sudhi te Home page ma jai j nai shake...

        const links = await getAllShortLinks(req.user.id);

        // return res.render("index", { links, host: req.host, isLoggedIn: req.cookies.isLoggedIn || false }); // whenever user hits "/" --> directly render "index.ejs" file. 
        // OR Lec-87
        return res.render("index", { links, host: req.host, errors: req.flash("errors"), isLoggedIn: req.cookies.isLoggedIn || false, success: req.flash("success") }); // whenever user hits "/" --> directly render "index.ejs" file. 
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const postURLShortenet = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login"); // User jya sudhi Login No kare, tya sudhi te Home page ma jai j nai shake...

        const { url, shortCode } = req.body; // req.body -> we can easily get "form data" inserted by user.
        // first, check in "links.json", if the same URL is already present (Duplicate data), then we will return the existing shortcode for that URL instead of creating a new shortcode for it.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); // if the user has provided a shortcode then we will use that shortcode, otherwise we will generate a random shortcode using crypto module by generating 4 random bytes and converting it to hexadecimal string format

        const link = await getShortLinkByShortCode(finalShortcode);

        // Lec-87 :- Now, we will check if the same URL is already present in the file or not. If it is present then we will return the existing shortcode for that URL, otherwise we will add a new entry for that URL with the generated shortcode in our database.
        if (link) {
            req.flash("errors", "ShortCode already exists. Please choose another shortcode.");
            return res.redirect("/");
        }

        await insertShortLink({ url, finalShortcode, userId: req.user.id }); // Lec-85 :- jyare koi user Login kari ne URL:Short_links add kare, To short_links table ma te user ni Id (Forign Key) pan store karvani...

        return res.redirect("/"); // whenever form is submitted, rather than redirectting to the another page, redirect to Home page...
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req, res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try {
        const { shortCode } = req.params;

        const link = await getShortLinkByShortCode(shortCode);

        if (!link) return res.redirect("/404"); // if that shortCode is not present in our database -> then, redirect to the error page 

        return res.redirect(link.url);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

// Lec-87 :- getShortenerEditPage
export const getShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params; // I am assuming that I will get id of the link which I want to edit.
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id); // ZOD Validation --> id must be integer.
    if (error) return res.redirect("/404"); // if id is not integer then redirect to 404 page.

    try {
        const shortLink = await findShortLinkById(id); // This will return Entire row of that "id" which I want to edit.

        if (!shortLink) return res.redirect("/404"); // if id is not found in database then redirect to 404 page.

        // If we found the shortLink then, we will render the "edit-shortLink.ejs" file and pass the data of the link which we want to edit.
        res.render("edit-shortLink", {
            id: shortLink.id,
            url: shortLink.url,
            shortCode: shortLink.shortCode,
            errors: req.flash("errors"),
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Lec-87 :- postShortenerEditPage
export const postShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params;
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
    if (error) return res.redirect("/404");

    try {
        const { url, shortCode } = req.body; // Get data from edit-shortLink.ejs file.

        // Manually check if the new shortCode already exists for a different link
        const existingLink = await getShortLinkByShortCode(shortCode);
        if (existingLink && existingLink.id !== id) {
            req.flash("errors", "Shortcode already exists, please choose another");
            return res.redirect(`/edit/${id}`);
        }

        const newUpdateShortCode = await updateShortCode({ id, url, shortCode }); // I want to update the shortCode of the link (which have perticular id) with new Updated shortCode.
        if (!newUpdateShortCode) return res.redirect("/404"); // if newUpdateShortCode is not found in database then redirect to 404 page.

        res.redirect("/"); // redirect to Home page.
    }
    catch (err) {
        // if shortCode is already exists in database then redirect to edit page.
        if (err.code === "ER_DUP_ENTRY" || err?.cause?.code === "ER_DUP_ENTRY") {
            req.flash("errors", "Shortcode already exists, please choose another");
            return res.redirect(`/edit/${id}`);
        }

        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Lec-88 :- deleteShortCode
export const deleteShortCode = async (req, res) => {
    try {
        const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
        if (error) return res.redirect("/404");

        await deleteShortCodeById(id);
        return res.redirect("/");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};
*/



// Lec-124 :- Pagination
import crypto from "crypto"; // we will use crypto module to generate a random shortcode for the URL
import {
    deleteShortCodeById,
    findShortLinkById,
    getAllShortLinks,
    getShortLinkByShortCode,
    insertShortLink,
    updateShortCode,
} from "../services/shortener.services.js"; // Lec-67
import z from "zod"; // Lec-87
import {
    shortenerSchema,
    shortenerSearchParamsSchema,
} from "../validators/shortener.validator.js";


export const getShortenerPage = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login"); // User jya sudhi Login No kare, tya sudhi te Home page ma jai j nai shake...

        // const links = await getAllShortLinks(req.user.id);
        // return res.render("index", { links, host: req.host, errors: req.flash("errors"), isLoggedIn: req.cookies.isLoggedIn || false, success: req.flash("success") }); // whenever user hits "/" --> directly render "index.ejs" file. 
        // Lec-124
        const searchParams = shortenerSearchParamsSchema.parse(req.query); // aana thi URL ma je data chhe te get kari shakay -> localhost:3000/?page=2
        const { shortLinks, totalCount } = await getAllShortLinks({
            userId: req.user.id,
            limit: 10,
            offset: (searchParams.page - 1) * 10,
        });

        console.log("searchParams: ", searchParams.page);

        // totalCount = 100
        const totalPages = Math.ceil(totalCount / 10); // 100/10 = 10

        return res.render("index", {
            links: shortLinks,
            host: req.host,
            currentPage: searchParams.page, // page no.
            totalPages: totalPages,
            errors: req.flash("errors"),
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server error");
    }
};

export const postURLShortenet = async (req, res) => {
    try {
        if (!req.user) return res.redirect("/login"); // User jya sudhi Login No kare, tya sudhi te Home page ma jai j nai shake...

        const { url, shortCode } = req.body; // req.body -> we can easily get "form data" inserted by user.
        // first, check in "links.json", if the same URL is already present (Duplicate data), then we will return the existing shortcode for that URL instead of creating a new shortcode for it.
        const finalShortcode = shortCode || crypto.randomBytes(4).toString('hex'); // if the user has provided a shortcode then we will use that shortcode, otherwise we will generate a random shortcode using crypto module by generating 4 random bytes and converting it to hexadecimal string format

        const link = await getShortLinkByShortCode(finalShortcode);

        // Lec-87 :- Now, we will check if the same URL is already present in the file or not. If it is present then we will return the existing shortcode for that URL, otherwise we will add a new entry for that URL with the generated shortcode in our database.
        if (link) {
            req.flash("errors", "ShortCode already exists. Please choose another shortcode.");
            return res.redirect("/");
        }

        await insertShortLink({ url, finalShortcode, userId: req.user.id }); // Lec-85 :- jyare koi user Login kari ne URL:Short_links add kare, To short_links table ma te user ni Id (Forign Key) pan store karvani...

        return res.redirect("/"); // whenever form is submitted, rather than redirectting to the another page, redirect to Home page...
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};

export const redirectToShortLink = async (req, res) => { // "/:shortCode" -> byDefault we make this as a Dynamic (so, according to Dynamic Route concept, we can easily get shortCode using req.params)
    try {
        const { shortCode } = req.params;

        const link = await getShortLinkByShortCode(shortCode);

        if (!link) return res.redirect("/404"); // if that shortCode is not present in our database -> then, redirect to the error page

        return res.redirect(link.url);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send("Internal server Error!");
    }
};


// Lec-87 :- getShortenerEditPage
export const getShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params;
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id); // ZOD Validation --> id must be integer.
    if (error) return res.redirect("/404"); // if id is not integer then redirect to 404 page.

    try {
        const shortLink = await findShortLinkById(id); // This will return Entire row of that "id" which I want to edit.

        if (!shortLink) return res.redirect("/404"); // if id is not found in database then redirect to 404 page.

        // If we found the shortLink then, we will render the "edit-shortLink.ejs" file and pass the data of the link which we want to edit.
        res.render("edit-shortLink", {
            id: shortLink.id,
            url: shortLink.url,
            shortCode: shortLink.shortCode,
            errors: req.flash("errors"), // .flash() -> this will return an array of error messages, and after returning the error messages, it will automatically clear the error messages from the session. So, if we refresh the page then the error messages will not be shown again.
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Lec-87 :- postShortenerEditPage
export const postShortenerEditPage = async (req, res) => {
    if (!req.user) return res.redirect("/login");
    // const id = req.params;
    const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
    if (error) return res.redirect("/404");

    try {
        const { url, shortCode } = req.body; // Get data from edit-shortLink.ejs file.

        // Manually check if the new shortCode already exists for a different link
        // if shortCode is already exists in database then redirect to edit page.
        const existingLink = await getShortLinkByShortCode(shortCode);
        if (existingLink && existingLink.id !== id) {
            req.flash("errors", "Shortcode already exists, please choose another");
            return res.redirect(`/edit/${id}`);
        }

        const newUpdateShortCode = await updateShortCode({ id, url, shortCode }); // I want to update the shortCode of the link (which have perticular id) with new Updated shortCode.
        if (!newUpdateShortCode) return res.redirect("/404");

        res.redirect("/"); // redirect to Home page.
    }
    catch (err) {
        // if shortCode is already exists in database then redirect to edit page.
        if (err.code === "ER_DUP_ENTRY" || err?.cause?.code === "ER_DUP_ENTRY") {
            req.flash("errors", "Shortcode already exists, please choose another");
            return res.redirect(`/edit/${id}`);
        }

        console.error(err);
        return res.status(500).send("Internal server error");
    }
};

// Lec-88 :- deleteShortCode
export const deleteShortCode = async (req, res) => {
    try {
        const { data: id, error } = z.coerce.number().int().safeParse(req.params.id);
        if (error) return res.redirect("/404");

        await deleteShortCodeById(id);
        return res.redirect("/");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
    }
};