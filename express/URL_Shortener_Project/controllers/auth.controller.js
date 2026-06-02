// Lec-70 :- ExpressJS Autentication : Registration Form & Login page with EJS
// Lec-71 :- Cookies
// Lec-72 :- cookie-parser middleware 

// Lec-75 :- How to store Registration data in database using Drizzle ORM
// Lec-76 :- Login Page implementation
// Lec-77 :- Password Hashing using bcryptjs
// Lec-78 :- Password Hashing using Argon2
// Lec-79 :- JWT (JSON Web Token) - based Authentication (Run :- do login & check "Application" in inspect)

// Lec-81 :- How to create protected route in our ExpressJS application (Do login & Run :- http://localhost:3000/me  & If i delete access_token from inspect->Application->Cookies , then it will render -> "Not Logged In" text)
// Lec-82 :- Implementing "Logout" functionality
// Lec-83 :- How to Throw Error & Sending Feedback to user 
// Lec-86 :- ZOD validation in our ExpressJS application

/*
import { getUserByEmail, createUser } from "../services/auth.services.js";
// import bcrypt from "bcryptjs";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { loginUserSchema, registerUserSchema } from "../validators/auth-validator.js"; // Lec-86
import dotenv from "dotenv";
dotenv.config();

export const getRegisterPage = (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }
    return res.render("auth/register", { errors: req.flash("errors") }); // Lec-83 in this way, we can retrieve errors data from the session. req.flash() array ma data aape -> ["error1", "error2", ...] -> for that, in Register.ejs ma data get karva mate forEach loop use karvi pade
};

export const getLoginPage = (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }
    return res.render("auth/login", { errors: req.flash("errors") }); // Lec-83
};

// Lec-71,76,77,79
export const postLogin = async (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }

    // Lec-86 (we already get data using destructure -> Now, we have to apply validation written in auth.validator.js)
    const { data, error } = loginUserSchema.safeParse(req.body); // Now, have aa 3ay data (name, email, password) auth.validator.js ma check thava jashe --> jo error hashe to tyathi error apad ne ahiya mali jashe...
    if (error) {
        const errors = error.issues[0].message;
        req.flash("errors", errors); 
        return res.redirect("/login");
    }
    const { email, password } = data; // Koi pan user data enter kare & te data get karva -> in expressJs -> req.body 

    // step-1 :- Check if user a kyarey te email thi (Login time j nakhiye 6 te) Register karyu chhe?
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
        req.flash("errors", "Invalid Email or Password"); // Lec-83
        return res.redirect("/login");
    }

    // step-2 :- Compare password
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) { // DB_password !== User_typing_password
        req.flash("errors", "Invalid Email or Password"); // Lec-83
        return res.redirect("/login");
    }

    // res.setHeader("Set-Cookie", "isLoggedIn=true ; path=/ ;") // Lec-71 :- Jyare koi login kare, tyare aapde Cookies ne store karva chhe. (you can check-> inspect->Application), As we are already LoggedIn , we hit any link in navbar -> we can see -> isLoggedIn=true
    // OR Lec-72
    // res.cookie("isLoggedIn", true); // we didn't need to set '/' path manually , because Cookie-parser & Express automatically set '/' path by default

    // OR  Lec-79 :- JWT (JSON Web Token)
    const token = jwt.sign( // basically, we are generating a token for the user, when he/she tries to login
        { id: user.id, name: user.name, email: user.email },  // payload
        process.env.JWT_SECRET,  // secret key
        { expiresIn: "30d" }  // expiry time
    );
    res.cookie("access_token", token); // store that token in cookies

    res.redirect("/"); // & redirect to home page
};

// Lec-75,77  (When user click on "Register" Button, then what to do?)
export const postRegister = async (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }

    // Lec-86 (we already get data using destructure -> Now, we have to apply validation written in auth.validator.js)
    const { data, error } = registerUserSchema.safeParse(req.body); // Now, have aa 3ay data (name, email, password) auth.validator.js ma chech thava jashe --> jo error hashe to tyathi error apad ne ahiya mali jashe...
    // console.log("Data : ", data);
    if (error) {
        const errors = error.issues[0].message;
        req.flash("errors", errors);
        return res.redirect("/register");
    }

    const { name, email, password } = data; // Koi pan user data enter kare & te data get karva -> in expressJs -> req.body 

    // step-1 :- check if user a nakheli emailID already present DB or not?
    const userExists = await getUserByEmail(email);

    if (userExists) {
        req.flash("errors", "User already exists"); // Lec-83 :- in this way, we can store errors data in the session
        return res.redirect("/register");
    }

    // step-2 :- Hash password
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds --> More salt rounds means more secure, but also slower
    // OR
    const hashedPassword = await argon2.hash(password);

    // if that email is not exist in db, then store that user data in db
    const [user] = await createUser({ name, email, password: hashedPassword }); // [user] -> because we are returning the id of the newly inserted row
    console.log(user);

    res.redirect("/login"); // Registration thaya bad , user ne login page par redirect karvo
};


// Lec-81 
export const getMe = async (req, res) => {
    if (!req.user) {
        return res.send("Not Logged In");
    }
    return res.send(`<h1>Hey, ${req.user.name} - ${req.user.email}</h1>`); // id,name,email are already stored in token payload.
};

// Lec-82
export const postLogout = async (req, res) => {
    res.clearCookie("access_token"); // Clear the access token cookie -> have jo token j nai hoi toh redirect to home page
    res.redirect("/");
};
*/


// Lec-91 :- Create Access Token , Refresh Token & store data in "sessions" table
// Lec-93 :- Logout User in our Dual/Hybrid based Authentication
// Lec-94 :- Auto-Login after Registration
// Lec-95 :- Implement Do-not Repeat yourself (DRY) in our Dual/Hybrid based Authentication
// Lec-96 :- Dynamic "Profile" Page
// Lec-99 :- Create "verify-email.js" page
// Lec-100 :- Insert verification Token in Database
// Lec-101 :- How to send email using Nodemailer
// Lec-104 :- How to verify Email?
// Lec-106 :- How to verify Email using MYSQL JOINS?
// Lec-107 :- Email Verification after User Registration
// Lec-110 :- Edit/Update User Profile

// Lec-111 :- How to change password after Login?
// Lec-112 :- Password Validation
// Lec-113 :- Complete Change Password
// Lec-114 :- Forgot(Reset) Password
// Lec-115 :- Post() Forgot(Reset) Password
// Lec-116 :- Create Beautiful MJML Template for Reset-Password
// Lec-117 :- Send Reset-Password Email in Our Gmail using Resend-API
// Lec-118 :- create Reset-Password Page & Verify your Reset-Password Token
// Lec-119 :- Finally :- Reset your Password & Update password in DB

// Lec-121 :- Complete Login with Google
// Lec-122 :- Complete Login with Github
// Lec-123 :- set password after social login (in profile page)
// Lec-126 :- Add Image Upload in User Profile using Multer

import { decodeIdToken, generateCodeVerifier, generateState } from "arctic";
import { OAUTH_EXCHANGE_EXPIRY } from "../config/constants.js";
import { google } from "../lib/oauth/google.js";
import { github } from "../lib/oauth/github.js";

import {
    getUserByEmail,
    createUser,
    clearUserSession,
    authenticateUser,
    findUserById,
    getAllShortLinks,
    sendNewVerifyEmailLink,
    findVerificationEmailToken,
    verifyUserEmailAndUpdate,
    clearVerifyEmailTokens,
    updateUserByName,
    updateUserPassword,
    comparePassword,
    createResetPasswordLink,
    findUserByEmail,
    getResetPasswordToken,
    clearResetPasswordToken,
    getUserWithOauthId,
    linkUserWithOauth,
    createUserWithOauth,
} from "../services/auth.services.js";

import {
    loginUserSchema,
    registerUserSchema,
    verifyEmailSchema,
    verifyUserSchema,
    verifyPasswordSchema,
    forgotPasswordSchema,
    verifyResetPasswordSchema,
    setPasswordSchema,
} from "../validators/auth-validator.js"; // Lec-86

import { getHtmlFromMjmlTemplate } from "../lib/get-html-from-mjml-template.js"; // Lec-116
import { sendEmail } from "../lib/send-email.js"; // Lec-117
import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();



export const getRegisterPage = (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }
    return res.render("auth/register", { errors: req.flash("errors") }); // Lec-83 in this way, we can retrieve errors data from the session. req.flash() array ma data aape -> ["error1", "error2", ...] -> for that, in Register.ejs ma data get karva mate forEach loop use karvi pade
};

export const getLoginPage = (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }
    return res.render("auth/login", { errors: req.flash("errors") }); // Lec-83
};

// Lec-71,76,77
export const postLogin = async (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }

    // Lec-86 (we already get data using destructure -> Now, we have to apply validation written in auth.validator.js)
    const { data, error } = loginUserSchema.safeParse(req.body); // Now, have aa 3ay data (name, email, password) auth.validator.js ma chech thava jashe --> jo error hashe to tyathi error apad ne ahiya mali jashe...
    if (error) {
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/login");
    }

    const { email, password } = data; // Koi pan user data enter kare & te data get karva -> in expressJs -> req.body 


    // step-1 :- Check if user a kyarey te email thi (Login time j nakhiye 6 te) Register karyu chhe?
    const user = await getUserByEmail(email);
    console.log(user);
    if (!user) {
        req.flash("errors", "Invalid Email or Password"); // Lec-83
        return res.redirect("/login");
    }

    if (!user.password) {
        // database hash password
        // if password is null
        req.flash(
            "errors",
            "You have created account using social login. Please login with your social account."
        );
        return res.redirect("/login");
    }

    // step-2 :- Compare password
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) { // DB_password !== User_typing_password
        req.flash("errors", "Invalid Email or Password"); // Lec-83
        return res.redirect("/login");
    }

    // Lec-91 :- Create Access Token , Refresh Token & store data in "sessions" table
    // Lec-95 :- Implement Do-not Repeat yourself (DRY) in our Dual/Hybrid based Authentication
    await authenticateUser({ user, req, res, email });

    res.redirect("/"); // & redirect to home page
};

// Lec-75,77  (When user click on "Register" Button, then what to do?)
export const postRegister = async (req, res) => {
    if (req.user) { // if user already have token(LoggedIn) then he can directly go to home page
        return res.redirect("/");
    }

    // Lec-86 (we already get data using destructure -> Now, we have to apply validation written in auth.validator.js)
    const { data, error } = registerUserSchema.safeParse(req.body); // Now, have aa 3ay data (name, email, password) auth.validator.js ma chech thava jashe --> jo error hashe to tyathi error apad ne ahiya mali jashe...
    // console.log("Data : ", data);
    if (error) {
        // console.log("Error : ", error);
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/register");
    }

    const { name, email, password } = data; // Koi pan user data enter kare & te data get karva -> in expressJs -> req.body 

    // step-1 :- check if user a nakheli emailID already present DB or not?
    const userExists = await getUserByEmail(email);

    if (userExists) {
        req.flash("errors", "User already exists"); // Lec-83 :- in this way, we can store errors data in the session
        return res.redirect("/register");
    }


    // step-2 :- Hash password
    // const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds --> More salt rounds means more secure, but also slower
    const hashedPassword = await argon2.hash(password);

    // if that email is not exist in db, then store that user data in db
    const [user] = await createUser({ name, email, password: hashedPassword }); // [user] -> because we are returning the id of the newly inserted row
    console.log(user);

    // Lec-94 :- Create Access Token , Refresh Token & store data in "sessions" table
    // Lec-95 :- Implement Do-not Repeat yourself (DRY) in our Dual/Hybrid based Authentication
    await authenticateUser({ user, req, res, name, email });

    // Lec-107
    await sendNewVerifyEmailLink({ req, email, userId: user.id });

    res.redirect("/profile"); // & redirect to profile page
};


// Lec-81 
export const getMe = async (req, res) => {
    if (!req.user) {
        return res.send("Not Logged In");
    }
    return res.send(`<h1>Hey, ${req.user.name} - ${req.user.email}</h1>`);
};

// Lec-82, 93
export const postLogout = async (req, res) => {
    // Lec-93 :- Clear the session also from the database
    await clearUserSession(req.user.sessionId);

    res.clearCookie("access_token"); // Clear the access token cookie -> have jo token j nai hoi toh redirect to home page
    // Lec-93 :- Clear the refresh token also from the cookie
    res.clearCookie("refresh_token");
    res.redirect("/");
};

// Lec-96
export const getProfilePage = async (req, res) => {
    if (!req.user) return res.send("Not logged in"); // Jo user Login j na hoi...

    const user = await findUserById(req.user.id); // User ni ID thi user ne find karvano...
    if (!user) return res.redirect("/login"); // Jo user DB ma j na hoi toh redirect to login page

    const userShortLinks = await getAllShortLinks(user.id); // User ni ID thi user ni short links ne get karvi

    return res.render("auth/profile", {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            isEmailValid: user.isEmailValid,
            hasPassword: Boolean(user.password),  // Lec-123 :- in DB, if password == NULL, then hasPassword is set to False.
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            links: userShortLinks,
        },
    });
};

// Lec-99 :- Create "verify-email.js" page
export const getVerifyEmailPage = async (req, res) => {
    if (!req.user) return res.redirect("/");

    const user = await findUserById(req.user.id);

    if (!user || user.isEmailValid) return res.redirect("/");

    return res.render("auth/verify-email", {
        email: user.email,
    });
};

// Lec-100, 101
export const resendVerificationLink = async (req, res) => {
    if (!req.user) return res.redirect("/");
    const user = await findUserById(req.user.id);
    if (!user || user.isEmailValid) return res.redirect("/");

    // Lec-107
    await sendNewVerifyEmailLink({ req, email: user.email, userId: user.id });

    res.redirect("/verify-email");
};

// Lec-104
export const verifyEmailToken = async (req, res) => {
    const { data, error } = verifyEmailSchema.safeParse(req.query); // url ma ? pachhi je data hoi tene "query strings" kehevay...  -> te data(token & email) get karvana...
    if (error) {
        return res.send("Verification link invalid or expired!");
    }

    // we have to check this 3 things in findVerificationEmailToken(data)
    // 1: user na DB je token store chhe & url ma je token aave chhe -> te same chhe ke nahi
    // 2: token expire thai gayo chhe ke nahi
    // 3: DB ma, token ni help thi userId find kari , Now userId thi email find karvano

    // const token = await findVerificationEmailToken(data); // Lec-104 :- without joins
    const [token] = await findVerificationEmailToken(data); // Lec-106 :- with joins
    console.log("🚀 ~ verifyEmailToken ~ token̥:", token);

    if (!token) res.send("Verification link invalid or expired!");

    // 2: Now DB ma, te email vali row ma "is_email_valid = true" karvanu...
    await verifyUserEmailAndUpdate(token.email);

    // 3: te email na jetla tokens DB ma store chhe (email verfication thai jai pacchi -> te badha tokens delete karvana...)
    // clearVerifyEmailTokens(token.email).catch(console.error); // OR
    clearVerifyEmailTokens(token.userId).catch(console.error);

    return res.redirect("/profile");
};

// Lec-110, 126
export const getEditProfilePage = async (req, res) => {
    if (!req.user) return res.redirect("/");

    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    return res.render("auth/edit-profile", { // Jyare "edit-profile" page render thai -> tyare te form ma name automatically show thavu joiye...
        name: user.name,
        avatarUrl: user.avatarUrl, // Lec-126
        errors: req.flash("errors"),
    });
};
export const postEditProfile = async (req, res) => {
    if (!req.user) return res.redirect("/");

    // const user = req.body;
    const { data, error } = verifyUserSchema.safeParse(req.body); // get Edited data using req.body (using ZOD validation)
    if (error) {
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/edit-profile");
    }

    // await updateUserByName({ userId: req.user.id, name: data.name });
    // OR
    // Lec-126
    const fileUrl = req.file ? `uploads/avatar/${req.file.filename}` : undefined;

    await updateUserByName({
        userId: req.user.id,
        name: data.name,
        avatarUrl: fileUrl, // Multer package ne khali image ni URL pass kari devani... --> DB ma "users" table ma "avatar_url" column ma store thashe...
    });

    return res.redirect("/profile");
};

// Lec-111
export const getChangePasswordPage = async (req, res) => {
    if (!req.user) return res.redirect("/");

    return res.render("auth/change-password", {
        errors: req.flash("errors"),
    });
};
// Lec-112
export const postChangePassword = async (req, res) => {
    const { data, error } = verifyPasswordSchema.safeParse(req.body); // get Form data using req.body (using ZOD validation)
    if (error) {
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/change-password");
    }

    const { currentPassword, newPassword } = data;

    // Lec-113
    // 1: Find user By its ID
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    // 2: Now check that current password is valid or not
    const isPasswordValid = await comparePassword(currentPassword, user.password); // user a type karelo curr_password & DB ma store thayelo curr_password_hashed same 6?
    if (!isPasswordValid) {
        req.flash("errors", "Current Password that you entered is invalid");
        return res.redirect("/change-password");
    }

    // 3: Now update the curr_password with new_password
    await updateUserPassword({ userId: user.id, newPassword });

    return res.redirect("/profile");
};


// Lec-114
export const getResetPasswordPage = async (req, res) => {
    return res.render("auth/forgot-password", {
        formSubmitted: req.flash("formSubmitted")[0], // Jo user a valid EmailId nakhi ne form submit karelu hashe to alag content, nai karelu hoi to alag content same page "forgot-password.ejs" ma render thashe...
        errors: req.flash("errors"),
    });
};
// Lec-115 
export const postForgotPassword = async (req, res) => {
    // 1: user je emailID form ma fill kare, tene get kari ne Validate karvano using ZOD
    const { data, error } = forgotPasswordSchema.safeParse(req.body);
    if (error) {
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/reset-password");
    }

    // 2: Find user By its Email
    const user = await findUserByEmail(data.email);

    if (user) {
        // 3: If user exists then Create Reset Password Link
        const resetPasswordLink = await createResetPasswordLink({ userId: user.id });

        // Lec-116
        // 4: Create MJML Template
        const html = await getHtmlFromMjmlTemplate("reset-password-email", {
            name: user.name, // Dynamic data , we just have to pass in .mjml file
            link: resetPasswordLink,
        });

        // Lec-117  Send Email
        sendEmail({
            to: user.email,
            subject: "Reset Your Password",
            html,
        });
    }

    req.flash("formSubmitted", true);
    return res.redirect("/reset-password");
};

// Lec-118
export const getResetPasswordTokenPage = async (req, res) => {
    // 1: Get Token using req.params
    const { token } = req.params;
    // 2: Verify Token (url mathi get karelu token & DB ma store thayelo token same chhe ke nahi)
    const passwordResetData = await getResetPasswordToken(token);
    if (!passwordResetData) return res.render("auth/wrong-reset-password-token");

    // 3: render reset-password page (aa page ne get karela data pan pass karvana...)
    return res.render("auth/reset-password", {
        formSubmitted: req.flash("formSubmitted")[0],
        errors: req.flash("errors"),
        token,
    });
};

// Lec-119
export const postResetPasswordToken = async (req, res) => {
    // 1: Get Token using req.params
    const { token } = req.params;
    // 2: Verify Token (url mathi get karelu token & DB ma store thayelo token same chhe ke nahi)
    const passwordResetData = await getResetPasswordToken(token);
    if (!passwordResetData) {
        req.flash("errors", "Password Token is not matching");
        return res.render("auth/wrong-reset-password-token");
    }

    // 3: User a type karela banne password get karvana (using req.body) (with proper ZOD validation)
    const { data, error } = verifyResetPasswordSchema.safeParse(req.body);
    if (error) {
        const errorMessages = error.issues.map((err) => err.message);
        req.flash("errors", errorMessages[0]);
        return res.redirect(`/reset-password/${token}`);
    }
    const { newPassword } = data;

    // 4: Identify userID linked to the token.
    const user = await findUserById(passwordResetData.userId);

    // 5: Now clear all existing reset tokens for that userID (Token jo previously exist karta hoi -> to te badha ne delete kari devana...)
    await clearResetPasswordToken(user.id);

    // 6: Now Update the user's new_password in the database with the hashed version.
    await updateUserPassword({ userId: user.id, newPassword });

    return res.redirect("/login");
};

// Lec-121
export const getGoogleLoginPage = async (req, res) => {
    if (req.user) return res.redirect("/"); // if user is already logged in then redirect to home page

    // Use Arctic library to generate state and code verifier
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    // create authorization url (also pass :- state & code verifier)
    const url = google.createAuthorizationURL(state, codeVerifier, [
        "openid", // this is called scopes, here we are giving openid, and profile
        "profile", // openid gives tokens if needed, and profile gives user information
        // we are telling google about the information that we require from user.
        "email",
    ]);

    // Now, store state & code verifier in cookies
    const cookieConfig = {
        httpOnly: true,
        secure: true,
        maxAge: OAUTH_EXCHANGE_EXPIRY,
        sameSite: "lax", // this is such that when google redirects to our website, cookies are maintained
    };

    res.cookie("google_oauth_state", state, cookieConfig);
    res.cookie("google_code_verifier", codeVerifier, cookieConfig);

    res.redirect(url.toString()); // Multiple emails vala page par re-direct karvanu...
    // (ahiya sudhi, aapda banne page aavi jashe ->  Multiple emails valu page & continue valu page)
};

// Lec-121
export const getGoogleLoginCallback = async (req, res) => {
    // google redirects with code, and state in query params
    // we will use code to find out the user
    const { code, state } = req.query; // jyare aapde "Continue" par click kariye, atle server pase request jai (/google/callback) -> atle farithi code,state male, jene get karvana...
    console.log(code, state);

    // Now, cookies ma store karela "code, state" destructure karine get karvana...
    const {
        google_oauth_state: storedState,
        google_code_verifier: codeVerifier,
    } = req.cookies;

    if (!code || !state || !storedState || !codeVerifier || state !== storedState) {
        req.flash("errors", "Couldn't login with Google because of invalid login attempt. Please try again!");
        return res.redirect("/login");
    }

    // state to check thai gyu, have banne na code verify karvana...
    let tokens;
    try {
        // arctic will verify the code given by google with code verifier internally
        tokens = await google.validateAuthorizationCode(code, codeVerifier);
    } catch {
        req.flash("errors", "Couldn't login with Google because of invalid login attempt. Please try again!");
        return res.redirect("/login");
    }

    console.log("token google: ", tokens);

    const claims = decodeIdToken(tokens.idToken());
    console.log("claim: ", claims);

    const { sub: googleUserId, name, email } = claims; // je user ne "Login with Google" karvu 6, tenu name,email aapo...

    //! now, je user "Login with Google" kare 6, tena data to DB ma store karva pade ne...
    // Condition 1: User already exists with google's oauth linked
    // Condition 2: User already exists with the same email but google's oauth isn't linked
    // Condition 3: User doesn't exist.

    // if user is already linked then we will get the user (user same emailID thi registration pan karelu 6 & "Login with Google" pan karelu 6, te biji var "Login with Google" karva mange 6 -> continue valu page nai aave.)
    let user = await getUserWithOauthId({
        provider: "google",
        email,
    });

    // if user exists but user is not linked with oauth (user same emailID thi registration to karelu 6 but, "Login with Google" pelli var kare 6 -> continue valu page batavvu pade.)
    if (user && !user.providerAccountId) { // for that, user to exist karvo joiye, but user pase "providerID" na hovi joiye, because user "Login with Google"kare pachhi tene "providerID" male.
        // so, Insert a new row in "oauth_accounts" table.
        await linkUserWithOauth({
            userId: user.id,
            provider: "google",
            providerAccountId: googleUserId,
            // avatarUrl: picture,
        });
    }

    // if user doesn't exist (what if user a banne vastu nathi kareli(registration & login with google))
    if (!user) {
        // so, Insert a new row in "oauth_accounts" & "users" tables.
        user = await createUserWithOauth({
            name,
            email,
            provider: "google",
            providerAccountId: googleUserId,
            // avatarUrl: picture,
        });
    }
    await authenticateUser({ req, res, user, name, email }); // jyare koi user first time Registration kare, to session_id, access_token & refresh_token generate karvu pade...

    res.redirect("/");
};


// Lec-122 :- aa akhu function run thaya pachhi -> github.com vala page par redirect thashe... 
export const getGithubLoginPage = async (req, res) => {
    if (req.user) return res.redirect("/"); // if user is already logged in then redirect to home page

    // Use "Arctic" library to generate "state"
    const state = generateState();

    // create authorization url (also pass :- "state" & user's email only)
    const url = github.createAuthorizationURL(state, ["user:email"]);

    // Now, store "state" in cookies
    const cookieConfig = {
        httpOnly: true,
        secure: true,
        maxAge: OAUTH_EXCHANGE_EXPIRY,
        sameSite: "lax", // this is such that when google redirects to our website, cookies are maintained
    };

    res.cookie("github_oauth_state", state, cookieConfig);

    res.redirect(url.toString());
};

// Lec-122
export const getGithubLoginCallback = async (req, res) => {
    // jyare user "Authorize TirthHirpara576" button click kare, tyare aa route (/github/callback) hit thai tyare URL mathi "code" & "state" male te get karvana...
    const { code, state } = req.query;
    const { github_oauth_state: storedState } = req.cookies; // cookies ma store karelo "state" get karvano...

    function handleFailedLogin() {
        req.flash("errors", "Couldn't login with GitHub because of invalid login attempt. Please try again!");
        return res.redirect("/login");
    }

    if (!code || !state || !storedState || state !== storedState) {
        return handleFailedLogin();
    }

    let tokens; // aaj token through aapde claims karine user ni details (name, user_ID, email) get karvana 6...
    try {
        tokens = await github.validateAuthorizationCode(code);
    } catch {
        return handleFailedLogin();
    }

    // find user details(name, user_ID) using fetching this API (jema access_token pass karvanu...)
    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    });
    if (!githubUserResponse.ok) return handleFailedLogin();
    const githubUser = await githubUserResponse.json(); // convert JSON format into Readable format
    const { id: githubUserId, name } = githubUser;

    // find user "email" using fetching this API (jema access_token pass karvanu...)
    const githubEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    });
    if (!githubEmailResponse.ok) return handleFailedLogin();

    const emails = await githubEmailResponse.json();
    const email = emails.filter((e) => e.primary)[0].email; // In GitHub we can have multiple emails, but we only want "primary email".
    if (!email) return handleFailedLogin();

    // there are few things that we should do
    //! Condition 1: User already exists with github's oauth linked (user same emailID thi registration pan karelu 6 & "Login with GitHub" pan karelu 6, te biji var "Login with GitHub" karva mange 6 -> "Authorize TirthHirpara576" valu page nai aave.)
    //! Condition 2: User already exists with the same email but github's oauth isn't linked (user same emailID thi registration to karelu 6 but, "Login with GitHub" pelli var kare 6 -> "Authorize TirthHirpara576" valu page batavvu pade.)
    //! Condition 3: User doesn't exist. (what if user a banne vastu nathi kareli(registration & login with GitHub))

    let user = await getUserWithOauthId({
        provider: "github",
        email,
    });

    if (user && !user.providerAccountId) {
        await linkUserWithOauth({
            userId: user.id,
            provider: "github",
            providerAccountId: githubUserId,
        });
    }

    if (!user) {
        user = await createUserWithOauth({
            name,
            email,
            provider: "github",
            providerAccountId: githubUserId,
        });
    }

    await authenticateUser({ req, res, user, name, email }); // jyare koi user first time Registration kare, to session_id, access_token & refresh_token generate karvu pade...

    res.redirect("/");
};

// Lec-123
export const getSetPasswordPage = async (req, res) => {
    if (!req.user) return res.redirect("/");

    return res.render("auth/set-password", {
        errors: req.flash("errors"),
    });
};
export const postSetPassword = async (req, res) => {
    if (!req.user) return res.redirect("/");

    const { data, error } = setPasswordSchema.safeParse(req.body);

    if (error) {
        const errorMessages = error.errors.map((err) => err.message);
        req.flash("errors", errorMessages);
        return res.redirect("/set-password");
    }

    const { newPassword } = data;

    const user = await findUserById(req.user.id); // avo user find karvano, jeno password = NULL hoi...
    if (user.password) {
        req.flash("errors", "You already have your Password, Instead Change your password");
        return res.redirect("/set-password");
    }

    await updateUserPassword({ userId: req.user.id, newPassword });

    return res.redirect("/profile");
};
