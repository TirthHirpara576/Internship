/* Lec-0 :- How to create a server using express framework. // To run this file :- $node --watch app.js & in browser :- http://localhost:3000/  */
/* Lec-1 :- Environment variables & ENV file in ExpressJS. 
    To run this file :- $node --watch app.js & in browser :- http://localhost:3000/   
OR  directly set environment variable in terminal :- $PORT=3000 node --watch app.js & in browser :- http://localhost:3000/              
OR  set environment variable in .env file :- PORT=3000 & package.json file :- "dev": "node --env-file=.env --watch app.js" & in terminal :- $npm run dev & in browser :- http://localhost:3000/   */
/* Lec-3 :- env variables validation using ZOD library in ExpressJS.  (app.js , env.js) 


import express from 'express';
import { PORT } from './env.js'; // import PORT variable from env.js file

const app = express(); // create instance of express

// Define a route for the root URL
// we don't need to specify the status code, content type, etc. because express will automatically handle it for us. We just need to send the response using res.send() method.
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'));
app.get('/about', (req, res) => res.send('<h1>This is a About Page!</h1>'));
app.get('/contact', (req, res) => {
    return res.send(`<h1>This is a Contact Page!</h1>
      <h1>URL Shortener</h1>
      <form id="shorten-form">
        <div>
          <label for="url">Enter URL:</label>
          <input type="url" id="url" name="url" required> <br/><br/>

          <label for="shortCode">Enter shortCode:</label>
          <input type="text" id="shortCode" name="shortCode" required> <br/><br/>
          <button type="submit">Shorten</button> <br/><br/>
        </div>
      </form>`
    );
});

// const PORT = process.env.PORT || 3000; // Define the port number, we can use environment variable or default value = 3000
// To create server, we need to listen to a port (Basically, server ne active to rakvu pade ne...)
// server ne active rakhvu, means Jyare koi page mate request aave tyare server response aape.
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
*/




/* Lec-5 :- How to send files in expressJS (app.js ,"public" folder -> index.html) 
// To run this file :- $npm run dev  , in browser :- http://localhost:3000/
import express from 'express';
import { PORT } from './env.js'; // import PORT variable from env.js file
import path from 'path'; // to work with file paths in node.js, we can use path module. It provides utilities for working with file and directory paths.

const app = express(); // create instance of express

// Define a route for the root URL
app.get('/', (req, res) => {
    // to get the current directory and file name :-
    // console.log(__dirname , __filename); // But it will not work in ES module (it only work in commonJS).
    // console.log(import.meta.dirname ,"\n", import.meta.url); // to get the current directory and file name in ES module.

    // const complete_fileName = new URL('./public/index.html', import.meta.url); // to get the complete file name with path.
    // console.log(complete_fileName.pathname);
    
    // To send index.html file as response to the client, we can use res.sendFile() method. It takes the complete file name with path as argument.
    const homePagePath = path.join(import.meta.dirname, 'public', 'index.html'); // to get the complete file name with path using path module.
    res.sendFile(homePagePath);
});
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
*/



/* Lec-6 :- How to serve static files in expressJS (app.js ,("public" folder -> index.html, style.css) )  
// To run this file :- $npm run dev  , in browser :- http://localhost:3000/
import express from 'express';
import { PORT } from './env.js'; // import PORT variable from env.js file
import path from 'path'; // to work with file paths in node.js, we can use path module. It provides utilities for working with file and directory paths.

const app = express(); // create instance of express

// to serve static files, we can use express.static() middleware. It takes the directory name as argument and serves the files in that directory.
// app.use(express.static('public')); // relative path, it will look for "public" folder in the current directory (where app.js file is located). But it may cause problem if we run the server from different directory. So, it's better to use absolute path.
// OR (go with absolute path)
app.use(express.static(path.join(import.meta.dirname, 'public'))); 

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
*/



/* Lec-7 :- ES Module - caveates in our ExpressJS Application (app.js) 
// To run this file :- $npm run dev
import express from 'express';
import { PORT } from './env.js';

const app = express(); // create instance of express

// Top-level await Example (without needing to wrap in async function) :-
const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
const data = await response.json();
console.log(data);

// in ES module, we don't have access to __dirname and __filename variables. So, we can use import.meta.dirname and import.meta.url to get the current directory and file name.
console.log(import.meta.dirname);
console.log(import.meta.filename);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
*/



/* Lec-8 :- Route-Parameters in ExpressJS (app.js)  
// To run this file :- $npm run dev  , in browser :- http://localhost:3000/profile/TirthHirpara576/article/how-to-learn-expressjs  
import express from 'express';
import { PORT } from './env.js';

const app = express(); // create instance of express

app.get('/profile/:username', (req, res) => {
  console.log(req.params); // req.params is an object that contains the route parameters. In this case, it will be { username: 'TirthHirpara576' }
  res.send(`<h1>My Username is : ${req.params.username}</h1>`);
});

// If you want to get multiple route parameters, you can define them in the route path. 
app.get('/profile/:username/article/:slug', (req, res) => {
  console.log(req.params); // req.params is an object that contains the route parameters. In this case, it will be { username: 'TirthHirpara576', slug: 'my-first-article' }
  res.send(`<h1>My Username is : ${req.params.username} and my article slug is ${req.params.slug}</h1>`);
});

app.listen(PORT, () => { 
  console.log(`Server is running at port: ${PORT}`);
});
*/



/* Lec-9 :- Query-Parameters in ExpressJS (used for searching,pagination) (app.js)  
// To run this file :- $npm run dev  , in browser :- http://localhost:3000/product?search=laptops 
// , http://localhost:3000/product?page=2&limit=10
import express from 'express';
import { PORT } from './env.js';

const app = express(); // create instance of express

// If anyone is request for product page :-
// app.use("/product",(req,res) => {
//     console.log(req.query); // if Nothing is to be added in URL then, It will give -> empty object 
//     res.send(`<h1>User search for ${req.query.search} in Product Page</h1>`);
// });

// If you want to access multiple query-parameters :-
app.use("/product",(req,res) => {
  console.log(req.query); 
  res.send(`<h1>User search for page number = ${req.query.page}  in Product Page. and in that page -> product limit = ${req.query.limit}.</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
*/



/* Lec-10 :- Form-Submissions in ExpressJS ("public"->index.html & app.js) 
   Lec-11 :- 404 Error page in ExpressJS ("public"->index.html & app.js)   */
// To run this file :- $npm run dev  , in browser :- http://localhost:3000/ 
import express from 'express';
import { PORT } from './env.js';
import path from "path";

const app = express(); // create instance of express

// for serving the static files -> we can use absolute path.
app.use(express.static(path.join(import.meta.dirname, 'public'))); 

app.use(express.urlencoded({extended:true})); // To use post method, we must have to use this middleware -> // using this property :- {extended:true} --> nested complex structure ne pan bou j easily parse kari shake...
// using {extended:true} property --> Output :- {  user: { name: 'Tirth Hirpara', message: 'Hi, I am a Tirth Hirpara.' }  }
// without {extended:true} property --> Output :- {  'user[name]': 'Tirth Hirpara',  'user[message]': 'Hi, I am a Tirth Hirpara.' }


// whenever form is submitted using bydefault "GET" request, we can get form data in form of object
// app.get("/contact", (req,res) => {
//     console.log(req.query);
//     res.redirect("/"); // in "res" -> method : .redirect() -> I'm redirect to homepage
// });
// OR (But because of URL-length issues & privacy -> we should use -> POST request)
app.post("/contact", (req,res) => {
    console.log(req.body);
    res.redirect("/"); 
});

// Lec-11 :- 404 Error page
app.use((req,res) => {
  // return res.status(404).send("<h1>404 : Page not found! </h1>");
  // OR ("views" folder -> 404.html)
  return res.status(404).sendFile(path.join(import.meta.dirname,"views","404.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

