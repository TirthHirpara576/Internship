/* Lec-12 :- URL shotener project using ExpressJS ("express" folder -> "URL_shotener_Project")
   Lec-13 :- Express Router() ("express" folder -> "URL_shotener_Project")
   Lec-14 :- Template-Engine in ExpressJS ("express" folder -> "URL_shotener_Project") (To run -> $npm run dev , http://localhost:3000/report )

import express from 'express';
// Lec-13
// import router from "./routes/shortener.routes.js";
// OR
import {shortenerRoutes} from "./routes/shortener.routes.js";

const app = express(); // Create instance of express
const PORT = 3000; // we will run our server on port 3000

app.use(express.static("public")); // to display style.css file whenever user requst for Homepage
app.use(express.urlencoded({ extended: true }));   // ✅ ADD THIS -> This is a built-in middleware function in Express. When you submit a form with method="POST", this middleware will parse the form data and populate req.body with the parsed data, making it easier to access form fields in your route handlers.

// Lec-14 : in expressJS, a template engine is a tool that lets you embed dynamic content into HTML files & render them on the server before sending them to the client. It allows you to create reusable templates, making it easier to generate dynamic web pages with minimal code.
app.set("view engine","ejs");
app.set("views","./views"); // bydefault, it access all the data of files inside "views" folder.

// Lec-13
// app.use(router); // Use default imported router
// OR 
app.use(shortenerRoutes); // Use Named imported router

// we will start the server by calling the listen method on the server object and we will pass the port number and a callback function to it which will be executed when the server is successfully started.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // when the server is successfully started then we will log a message in the console saying "Server is running on http://localhost:3000"
});
*/




// Lec-58 :- ExpressJS + Mongoose in our URL_Shortener_Project
/*
import express from 'express';
// Lec-13
// import router from "./routes/shortener.routes.js";
// OR
import {shortenerRoutes} from "./routes/shortener.routes.js";
import { connectDB } from './config/db_client.js';

const app = express(); // Create instance of express
const PORT = 3000; // we will run our server on port 3000

app.use(express.static("public")); // to display style.css file whenever user requst for Homepage
app.use(express.urlencoded({ extended: true }));   // ✅ ADD THIS

// Lec-14 : in expressJS, a template engine is a tool that lets you embed dynamic content into HTML files & render them on the server before sending them to the client. It allows you to create reusable templates, making it easier to generate dynamic web pages with minimal code.
app.set("view engine","ejs");
app.set("views","./views"); // bydefault, it access all the data of files inside "views" folder.

// Lec-13
// app.use(router); // Use default imported router
// OR 
app.use(shortenerRoutes); // Use Named imported router

// we will start the server by calling the listen method on the server object and we will pass the port number and a callback function to it which will be executed when the server is successfully started.
try{
    await connectDB(); // lec-58
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`); // when the server is successfully started then we will log a message in the console saying "Server is running on http://localhost:3000"
    });
}
catch(err){
    console.error(err);
}
*/





/* Lec-63 :- Backend URL_Shortener_Project MYSQL+ExpreeJS & Frontend : EJS + CSS
   Lec-70 :- ExpressJS Autentication : Registration Form & Login page with EJS
   Lec-72 :- cookie-parser middleware 
   Lec-80 :- How to verify JWT (Run :- do login & console)
   Lec-81 :- How to create protected route in our ExpressJS application (Do login & Run :- http://localhost:3000/me  & If i delete access_token from inspect->Application->Cookies , then it will render -> "Not Logged In" text)
   Lec-83 :- How to Throw Error & Sending Feedback to user
*/

import express from 'express';
// Lec-13
// import router from "./routes/shortener.routes.js";
// OR
import { shortenerRoutes } from "./routes/shortener.routes.js";
import { authRoutes } from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { verifyAuthentication } from './middleware/verify.middleware.js'; // Lec-80
// Lec-83
import session from 'express-session';
import flash from 'connect-flash';
// Lec-91
import requestIp from 'request-ip';

const app = express(); // Create instance of express
const PORT = 3000; // we will run our server on port 3000

app.use(express.static("public")); // to display style.css file whenever user requst for Homepage
app.use(express.urlencoded({ extended: true }));   // ✅ ADD THIS

// Lec-14 : in expressJS, a template engine is a tool that lets you embed dynamic content into HTML files & render them on the server before sending them to the client. It allows you to create reusable templates, making it easier to generate dynamic web pages with minimal code.
app.set("view engine", "ejs");
app.set("views", "./views"); // bydefault, it access all the data of files inside "views" folder.

// Lec-72
app.use(cookieParser()); // Add middleware

// Lec-83
app.use(session({
    secret: "my-secret", // Secret key (any random string)
    resave: true, // false -> Don't save session if nothing changed
    saveUninitialized: false, // false -> Don't create session until something is stored
}));
app.use(flash()); // Add flash middleware -> use of this flash() is to store any message in session (i.e. if user is not logged in, then show "Please login first" message & redirect to login page)

// Lec-91
app.use(requestIp.mw()); // Add middleware --> using this middleware, req.clientIp() will be available in all routes -> so, I get IP easily.

// Lec-80
app.use(verifyAuthentication); // Add middleware --> Every request -> this Middleware "chalega hi chalega" -> EX: When i try to access Home page/profile/Logout
// Lec-81
app.use((req, res, next) => {
    res.locals.user = req.user; // I am creating a new property "user" on res.locals object, so that I can access it in any EJS template (i don't need to write res.user every time)
    return next();
});

// Lec-13
// app.use(router); // Use default imported router
// OR 
// Register auth routes before the wildcard shortener routes
app.use(authRoutes);

// Use named shortener router (wildcard route `/:shortCode` must come after auth routes)
app.use(shortenerRoutes); // Use Named imported router

// we will start the server by calling the listen method on the server object and we will pass the port number and a callback function to it which will be executed when the server is successfully started.
try {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`); // when the server is successfully started then we will log a message in the console saying "Server is running on http://localhost:3000"
    });
}
catch (err) {
    console.error(err);
}
