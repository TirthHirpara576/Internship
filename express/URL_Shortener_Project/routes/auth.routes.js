// Lec-70 :- ExpressJS Autentication : Registration Form & Login page with EJS
// Lec-71 :- Cookies

// Lec-75 :- How to store Registration data in database using Drizzle ORM
// Lec-76 :- Login Page implementation

// Lec-81 :- How to create protected route in our ExpressJS application (Do login & Run :- http://localhost:3000/me  & If i delete access_token from inspect->Application->Cookies , then it will render -> "Not Logged In" text)
// Lec-82 :- Implementing "Logout" functionality
// Lec-96 :- Dynamic "Profile" Page
// Lec-99 :- Create "verify-email.js" page
// Lec-100 :- Insert verification Token in Database
// Lec-104 :- How to verify Email?
// Lec-110 :- Edit/Update User Profile

// Lec-111 :- How to change password after Login?
// Lec-114 :- Forgot(Reset) Password
// Lec-115 :- Post() Forgot(Reset) Password
// Lec-118 :- create Reset-Password Page & Verify your Reset-Password Token
// Lec-119 :- Finally :- Reset your Password & Update password in DB

// Lec-121 :- Complete Login with Google
// Lec-122 :- Complete Login with Github
// Lec-123 :- set password after social login (in profile page)

// Lec-126 :- Add Image Upload in User Profile using Multer

import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";
// Lec-126
import multer from "multer"; // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in Express applications.
import path from "path";

const router = Router();

// Lec-70
router.get("/register", authControllers.getRegisterPage);   // GET request
// Lec-70
router.get("/login", authControllers.getLoginPage);
// Lec-71,76
router.post("/login", authControllers.postLogin);   // POST request
// Lec-75
router.post("/register", authControllers.postRegister); 

// Lec-81
router.get("/me", authControllers.getMe); // Only my data (Profile jevu)

// Lec-82
router.get("/logout", authControllers.postLogout); // Logout functionality

// Lec-96
router.get("/profile", authControllers.getProfilePage); // Dynamic "Profile" Page

// Lec-99
router.get("/verify-email", authControllers.getVerifyEmailPage); // GET request

// Lec-100
router.post("/resend-verification-link", authControllers.resendVerificationLink); // POST request

// Lec-104
router.get("/verify-email-token", authControllers.verifyEmailToken); // GET request

// Lec-126
const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => { // cb = callback , destination -> images kya store thashe? -> public/uploads/avatar
        cb(null, "public/uploads/avatar");
    },
    filename: (req, file, cb) => { // filename -> what is the name of my img?
        const ext = path.extname(file.originalname); // first extract extension of img
        cb(null, `${Date.now()}_${Math.random()}${ext}`); // then create new name of img (Date.now() -> to make it unique)
    },
});
const avatarFileFilter = (req, file, cb) => { // Now, put filter -> Image vali files j khali accept thavi joiye...
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};
const avatarUpload = multer({ // call above 2 functions here
    storage: avatarStorage,
    fileFilter: avatarFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
});

// Lec-110
router.get("/edit-profile", authControllers.getEditProfilePage); // GET request -> jyare user profile page ma "Edit Profile" button click kare tyare aa page render thashe...
// Lec-126
router.post("/edit-profile", avatarUpload.single("avatar"), authControllers.postEditProfile); // POST request -> jyare user form ma data submit kare tyare aa route call thashe -> also update user's data in database...

// Lec-111
router.get("/change-password", authControllers.getChangePasswordPage); // GET request -> jyare user profile page ma "Change Password" button click kare tyare aa page render thashe...
router.post("/change-password", authControllers.postChangePassword); // POST request -> jyare user form ma data submit kare tyare aa route call thashe -> also update user's password in database...

// Lec-114
router.get("/reset-password", authControllers.getResetPasswordPage); // GET request -> jyare user forgot password button click kare tyare aa page render thashe...
router.post("/reset-password", authControllers.postForgotPassword); // Lec-115 -> POST request -> jyare user form ma data submit kare tyare aa route call thashe -> also update user's password in database...

// Lec-118
router.get("/reset-password/:token", authControllers.getResetPasswordTokenPage); // GET request -> jyare user mail ma aapela "forgot password" button click kare tyare aa page render thashe...
// Lec-119
router.post("/reset-password/:token", authControllers.postResetPasswordToken); // POST request -> jyare user form ma data submit kare tyare aa route call thashe -> also update user's password in database...

// Lec-121
router.get("/google", authControllers.getGoogleLoginPage); // GET request -> jyare user google login button click kare tyare aa route call thashe...
router.get("/google/callback", authControllers.getGoogleLoginCallback); // GET request -> jyare user "continue" button click kare tyare aa route call thashe...

// Lec-122
router.get("/github", authControllers.getGithubLoginPage); // GET request -> jyare user github login button click kare tyare aa route call thashe...
router.get("/github/callback", authControllers.getGithubLoginCallback); // GET request -> jyare user "Authorize TirthHirpara576" button click kare tyare aa route call thashe...

// Lec-123
router.get("/set-password", authControllers.getSetPasswordPage); // GET request -> jyare user profile page ma "Set Password" button click kare tyare aa page render thashe...
router.post("/set-password", authControllers.postSetPassword); // POST request -> jyare user form ma data submit kare tyare aa route call thashe -> also update user's password in database...

export const authRoutes = router; // aa name thi hu mara router ne export karu 6u...