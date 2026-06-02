// Lec-12 :- URL shotener project using ExpressJS ("express" folder -> "URL_shotener_Project")
// Lec-13 :- Express Router() ("express" folder -> "URL_shotener_Project")
// Lec-14 :- Template-Engine in ExpressJS ("express" folder -> "URL_shotener_Project") (To run -> $npm run dev , http://localhost:3000/report )
// Lec-15 :- EJS partials in ExpressJS ("express" folder -> "URL_shotener_Project") (To run -> $npm run dev , http://localhost:3000/report )
// Lec-16 :- Model View Controller (MVC) pattern ("express" folder -> "URL_shotener_Project") (To run -> $npm run dev , http://localhost:3000/report )

// Lec-87 :- Edit/Update functionality in URLs and Shortcodes
// Lec-88 :- Delete functionality in URLs and Shortcodes

import express from "express"; // Lec-13
const router = express.Router();
// Lec-16
import { postURLShortenet, getShortenerPage, redirectToShortLink, getShortenerEditPage, postShortenerEditPage, deleteShortCode, } from '../controllers/postshortener.controller.js';

// Lec-14 :- Basically, we are creating a templete, in that template -> dynamic data will placed (in future)
// Lec-15
/*
router.get("/report",(req,res) => {
    // res.send("Hii, I am a Report Page.");

    // But I want to render "report.ejs" file inside "views" folder
    // res.render("report" , { name : "Tirth Hirpara" });

    const student = [
        {name : "Aarav", grade : "AA", favoriteSubject : "Maths",},
        {name : "Dharmik", grade : "AC", favoriteSubject : "COA",},
        {name : "Meet", grade : "BB", favoriteSubject : "OS",},
    ];
    return res.render("report" , { student });
});
*/


// Lec-16
router.get("/", getShortenerPage); // Whenever I hit any request -> using .get() -> I serving index.html file.
router.post("/", postURLShortenet); // whenever user submit the form, we have to get all data from "links.json" & displaying it to the frontend...
router.get("/:shortCode", redirectToShortLink); // ✅ when we hit the shortCode in URL then it should redirect to original URL

// Lec-87
router.route("/edit/:id").get(getShortenerEditPage).post(postShortenerEditPage); // I am assuming that I will get id of the link which I want to edit.

// Lec-88
router.route("/delete/:id").post(deleteShortCode); // Though I am deleting, But still I can use post request

// export default router;
// OR (but in large applications, better to use Named Export) (suppose, Tomorrow I have many routers -> so, it's always best practice t go with Named-Export)
export const shortenerRoutes = router;