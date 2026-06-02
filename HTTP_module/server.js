// Lec-18 :- Create our own Web Server using HTTP module in Node.js
// Lec-19 :- How to automatically restart our server using Nodemon in Node.js
// To run this file, terminal -> "npx nodemon server.js" and then in browser -> "http://localhost:3000/"

// Lec-20 :- How to automatically restart our server using Node.js
// To run this file, terminal -> "node --watch server.js" and then in browser -> "http://localhost:3000/"

const http = require("http");

// To create web server
const server = http.createServer((req, res) => { // Here, server = EventEmitter
    // client will request for perticuler URL, and server have to respond to that URL
    if (req.url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<h1> I am Tirth Hirpara from BVM college. I am a computer Engineer student. </h1>");
        res.end();
    }
    if (req.url === "/source-code") {
        res.write("Happy Diwali 🎉 Are you looking for high-quality, ready-to-use website source code? Look no further! Our collection of more than 10+ projects & websites has everything you need to get started on your next project.");
        res.end();
    }
    if (req.url === "/contact") {
        res.setHeader("Content-Type", "text/plain");
        res.write("Have a Project or want to Collaborate? whatsapp now");
        res.end();
    }
});

// Any time client will send request to this PORT, our server will respond to that request
const PORT = 3000;
server.listen(PORT, () => { // we have to listen request from client on this PORT
    console.log(`🔥 Listening on PORT ${PORT}`);
});