// Lec-75 :- How to store Registration data in database using Drizzle ORM
// Lec-91 :- Create Access Token , Refresh Token & store data in "sessions" table
// Lec-92 :- Refreshing access_token when it expires (session+JWT)
// Lec-93 :- Logout User in our Dual/Hybrid based Authentication
// Lec-95 :- Implement Do-not Repeat yourself (DRY) in our Dual/Hybrid based Authentication
// Lec-96 :- Dynamic "Profile" Page
// Lec-100 :- Insert verification Token in Database
// Lec-102 :- DBMS Transactions
// Lec-103 :- implement URL API for verifing the links
// Lec-104 :- How to verify Email?
// Lec-106 :- How to verify Email using MYSQL JOINS?
// Lec-107 :- Email Verification after User Registration
// Lec-108 :- How to send Email using MJML Template
// Lec-109 :- How to send Email directly in Gmail using "Resend"
// Lec-110 :- Edit/Update User Profile
// Lec-113 :- Complete Change Password
// Lec-115 :- Post() Forgot(Reset) Password
// Lec-118 :- create Reset-Password Page & Verify your Reset-Password Token
// Lec-119 :- Finally :- Reset your Password & Update password in DB

// Lec-121 :- Complete Login with Google, GitHub
// Lec-126 :- Add Image Upload in User Profile using Multer

import { and, eq, gte, lt, sql } from "drizzle-orm";
import { db } from "../config/db.js";
import { usersTable, sessionsTable, shortLinksTable, verifyEmailTokensTable, passwordResetTokensTable, oauthAccountsTable } from "../drizzle/schema.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ACCESS_TOKEN_EXPIRY, MILLISECONDS_PER_SECOND, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
// import { sendEmail } from "../lib/nodemailer.js";
// OR
import { sendEmail } from "../lib/send-email.js"; // Lec-109
import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import mjml2html from "mjml";
import argon2 from "argon2";
import dotenv from "dotenv";
dotenv.config();

export const getUserByEmail = async (email) => { // check if user is already registered with same email
    const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
    return user;
};

export const createUser = async ({ name, email, password }) => { // create new user
    return await db.insert(usersTable).values({ name, email, password }).$returningId(); // returns the id of the newly inserted row
};

// Lec-91 (Insert this data into "sessions" table)
export const createSession = async (userId, { ip, userAgent }) => {
    const [session] = await db
        .insert(sessionsTable)
        .values({ userId, ip, userAgent })
        .$returningId(); // basically, we are returning the id of the newly inserted row

    return session;
};
export const createAccessToken = ({ id, name, email, sessionId }) => { // Access Token create karvu means haju ak JSON web Token(userInfo/payLoad , secretKey , expiryTime) create karvu...
    return jwt.sign({ id, name, email, sessionId }, process.env.JWT_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "15m",
    });
};
export const createRefreshToken = (sessionId) => {
    return jwt.sign({ sessionId }, process.env.JWT_SECRET, {
        expiresIn: REFRESH_TOKEN_EXPIRY / MILLISECONDS_PER_SECOND, //   expiresIn: "1w",
    });
};

// Lec-92 :- verifyJWTToken
export const verifyJWTToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);  // if user is logged in but token is invalid
};
// Lec-92 :- findSessionById
export const findSessionById = async (sessionId) => { // Check if the session is valid using sessionId -> if it is valid then it will return the session data.
    const [session] = await db
        .select()
        .from(sessionsTable)
        .where(eq(sessionsTable.id, sessionId));

    return session;
};

// Lec-92 :- findUserById
export const findUserById = async (userId) => { // Check if the user is valid using userId -> if it is valid then it will return all the data of that user.
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, userId));

    return user;
};
// Lec-92 :- refreshTokens
export const refreshTokens = async (refreshToken) => {
    try {
        const decodedToken = verifyJWTToken(refreshToken); // Again check if the refresh token is valid
        const currentSession = await findSessionById(decodedToken.sessionId); // Check if the session is valid using sessionId -> if it is valid then it will return the session data.

        if (!currentSession || !currentSession.valid) {
            throw new Error("Invalid session"); // if session is not valid then throw error
        }

        const user = await findUserById(currentSession.userId); // Check if the user is valid using userId -> if it is valid then it will return all the data of that user.

        if (!user) throw new Error("Invalid User"); // if user is not valid then throw error

        const userInfo = {
            id: user.id,
            name: user.name,
            email: user.email,
            isEmailValid: user.isEmailValid,
            sessionId: currentSession.id,
        };

        // Create new access & refresh token
        const newAccessToken = createAccessToken(userInfo);
        const newRefreshToken = createRefreshToken(currentSession.id);

        // Return new access & refresh token
        return {
            newAccessToken,
            newRefreshToken,
            user: userInfo,
        };
    } catch (error) {
        console.log(error.message);
    }
};

// Lec-93 :- clearUserSession
export const clearUserSession = async (sessionId) => {
    return db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
};

// Lec-95 
export const authenticateUser = async ({ user, req, res, name, email }) => {
    // we need to create a sessions -> data "sessions" table ma add karvana...
    const session = await createSession(user.id, {
        ip: req.clientIp,
        userAgent: req.headers["user-agent"],
    });
    // Create Access Token & Refresh Token
    const accessToken = createAccessToken({
        id: user.id,
        name: user.name || name,
        email: user.email || email,
        isEmailValid: false,
        sessionId: session.id,
    });
    const refreshToken = createRefreshToken(session.id);
    // I want to pass some extra info with cookie
    const baseConfig = { httpOnly: true, secure: true };
    res.cookie("access_token", accessToken, {
        ...baseConfig,
        maxAge: ACCESS_TOKEN_EXPIRY,
    });
    res.cookie("refresh_token", refreshToken, {
        ...baseConfig,
        maxAge: REFRESH_TOKEN_EXPIRY,
    });
    return session;
};

// Lec-96 :- (in "short_links" table -> user_id (Foreign Key) chhe. To tenathi Logged-in Users ni badhi short-links mali jai...)
export const getAllShortLinks = async (userId) => {
    return await db
        .select()
        .from(shortLinksTable)
        .where(eq(shortLinksTable.userId, userId));
};

// Lec-100
export const generateRandomToken = (digit = 8) => {
    const min = 10 ** (digit - 1); // 10000000
    const max = 10 ** digit; // 100000000

    return crypto.randomInt(min, max).toString();
};
export const insertVerifyEmailToken = async ({ userId, token }) => {
    // Lec-102
    return db.transaction(async (tx) => { // Transaction -> ek sathe badhi query execute karavani... (ek pan fail thai to -> Rolled back)
        try {
            // Table ma already te j row ma "Expired Token" present Hoi to -> previous "Expired Token" ne Delete kari ne pachhi -> New Token insert karvano...
            await tx.delete(verifyEmailTokensTable).where(lt(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`)); // Token -> create : friday - 11:15 + 1 day , saturday - 11:30 > 11:15 (means, Token is Expired.)

            await tx.delete(verifyEmailTokensTable).where(eq(verifyEmailTokensTable.userId, userId)); // Delete the previous existing tokens of the same user.(k jema user a Login to karyu tu (Token generate thai ne DB ma store pan thayu tu), but Token ne verify nohtu kary...)

            await tx.insert(verifyEmailTokensTable).values({ userId, token }); // Then, te j user mate fresh  generate karelu token insert karvanu...
        }
        catch (error) {
            console.log("Failed to insert token verification : ", error.message);
            console.log("Unable to create verification Token. ");
        }
    });
};
// export const createVerifyEmailLink = async ({ email, token }) => {
//     const uriEncodedEmail = encodeURIComponent(email);
//     return `${process.env.FRONTEND_URL}/verify-email-token?token=${token}&email=${uriEncodedEmail}`;  // hostname/path?token&email
// };

// OR  Lec-103 :- implement URL API for verifing the links
export const createVerifyEmailLink = async ({ email, token }) => {
    const url = new URL(`${process.env.FRONTEND_URL}/verify-email-token`); // hostname/path

    url.searchParams.append("token", token); // ?token
    url.searchParams.append("email", email); // &email

    return url.toString(); // http://localhost:3000/verify-email-token?token=12659877&email=xyz@gmail.com
};

// Lec-104
/*
export const findVerificationEmailToken = async ({ token, email }) => {
    // 1: user na DB je token store chhe & url ma je token aave chhe -> te same chhe ke nahi & te Token Expired to nathi thayu ne?
    // 2: token expire thai gayo chhe ke nahi
    const tokenData = await db
        // .select({ key: table_name.column_name })
        .select({
            userId: verifyEmailTokensTable.userId,
            token: verifyEmailTokensTable.token,
            expiresAt: verifyEmailTokensTable.expiresAt,
        })
        .from(verifyEmailTokensTable)
        .where(
            and(
                eq(verifyEmailTokensTable.token, token),
                gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`) // Check token Expired to nathi thayu ne... (ExpiredAt >= CurrentTimestamp)
            )
        );

    // If no token found, return null
    if (!tokenData.length) {
        return null;
    }

    const { userId } = tokenData[0]; // OR  const userId = tokenData[0].userId;

    // 3: DB ma, token ni help thi userId find kari , Now userId thi email find karvano
    const userData = await db
        .select({
            userId: usersTable.id,
            email: usersTable.email,
        })
        .from(usersTable)
        .where(eq(usersTable.id, userId));

    // If user not found, return null
    if (!userData.length) {
        return null;
    }

    return {
        userId: userData[0].userId,
        email: userData[0].email,
        token: tokenData[0].token,
        expiresAt: tokenData[0].expiresAt,
    };
};
*/

// Lec-106
export const findVerificationEmailToken = async ({ token, email }) => { // "users" & "is_email_valid" -> aa banne tables ma "user_id" column common chhe -> so that, use INNER_JOIN
    // console.log("token: ", token);

    return db
        .select({
            userId: usersTable.id,
            email: usersTable.email,
            token: verifyEmailTokensTable.token,
            expiresAt: verifyEmailTokensTable.expiresAt,
        })
        .from(verifyEmailTokensTable)
        .where(
            and(
                eq(verifyEmailTokensTable.token, token), // banne table ma token same hoi...
                eq(usersTable.email, email), // banne table ma email same hoi...
                gte(verifyEmailTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`) // Check token Expired to nathi thayu ne... (ExpiredAt >= CurrentTimestamp)
            )
        ).innerJoin(usersTable, eq(verifyEmailTokensTable.userId, usersTable.id));
};


// Lec-104  Now DB ma, te email vali row ma "is_email_valid = true" karvanu...
export const verifyUserEmailAndUpdate = async (email) => {
    return db
        .update(usersTable)
        .set({ isEmailValid: true })
        .where(eq(usersTable.email, email));
};

// Lec-104  te email na jetla tokens DB ma store chhe (email verfication thai jai pacchi -> te badha tokens delete karvana...)
export const clearVerifyEmailTokens = async (userId) => {
    // const [user] = await db
    //     .select()
    //     .from(usersTable)
    //     .where(eq(usersTable.email, email));

    return await db
        .delete(verifyEmailTokensTable)
        .where(eq(verifyEmailTokensTable.userId, userId));
};

/* Lec-107
export const sendNewVerifyEmailLink = async ({ req, userId, email }) => {
    const randomToken = generateRandomToken();

    // Now, we have to store this randomToken in DB
    await insertVerifyEmailToken({ userId, token: randomToken });

    // Now, we have to create "Verification Link" 
    const verifyEmailLink = await createVerifyEmailLink({
        email,
        token: randomToken,
    });

    await sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<h1>Click the link below to verify your email</h1>
                <p>You can use this token: <code>${randomToken}</code></p>
                <a href="${verifyEmailLink}">Verify Email</a>`,
    }).catch((error) => {
        console.log(error);
        if (req) req.flash("errors", "Failed to send verification email");
    });
};
*/

// Lec-108
export const sendNewVerifyEmailLink = async ({ userId, email }) => {
    const randomToken = generateRandomToken();

    await insertVerifyEmailToken({ userId, token: randomToken });

    const verifyEmailLink = await createVerifyEmailLink({
        email,
        token: randomToken,
    });

    // step-1 :- to get the MJML file data
    const mjmlTemplate = await fs.readFile(
        path.join(import.meta.dirname, "..", "emails", "verify-email.mjml"),
        "utf-8"
    );

    // step-2 :- in MJML file -> replace the placeholders with the actual Dynamic values  -> <%= code %> , href="<%= link %>"
    const filledTemplate = ejs.render(mjmlTemplate, {
        code: randomToken,
        link: verifyEmailLink,
    });

    // step-3 :- to convert mjml to html
    const htmlOutput = mjml2html(filledTemplate).html;
    // Lec-109
    sendEmail({
        to: email,
        subject: "Verify your email",
        html: htmlOutput,
    }).catch(console.error);
};

// Lec-110, 126
export const updateUserByName = async ({ userId, name, avatarUrl }) => {
    return await db
        .update(usersTable)
        .set({ name: name, avatarUrl: avatarUrl })
        .where(eq(usersTable.id, userId));
};


// Lec-113
export const hashPassword = async (password) => {
    // return await bcrypt.hash(password, 10);
    return await argon2.hash(password);
};

export const comparePassword = async (password, hash) => {
    // return await bcrypt.compare(password, hash);
    return await argon2.verify(hash, password);
};
// Lec-113
export const updateUserPassword = async ({ userId, newPassword }) => {
    const newHashPassword = await hashPassword(newPassword); // first of all, hash the new password, then update in DB

    return await db
        .update(usersTable)
        .set({ password: newHashPassword })
        .where(eq(usersTable.id, userId));
};

// Lec-115
export const findUserByEmail = async (email) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

    return user;
};
export const createResetPasswordLink = async ({ userId }) => {
    // 1: Create a random token ✅
    const randomToken = crypto.randomBytes(32).toString("hex");

    // 2: convert that token into hash token ✅
    const tokenHash = crypto
        .createHash("sha256")
        .update(randomToken)
        .digest("hex");

    // 3: If UserID already contains some token (previously) -> delete that token from table ✅
    await db
        .delete(passwordResetTokensTable)
        .where(eq(passwordResetTokensTable.userId, userId));

    // 4: now we need to insert userid, hashToken ✅
    await db.insert(passwordResetTokensTable).values({ userId, tokenHash });

    // 5: return the link (create the link ) ✅
    return `${process.env.FRONTEND_URL}/reset-password/${randomToken}`;
};

// Lec-118
export const getResetPasswordToken = async (token) => {
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex"); // DB ma store thayelo token hash chhe -> so that, we need to convert the "token" into hash token...

    const [data] = await db
        .select()
        .from(passwordResetTokensTable)
        .where(
            and(
                eq(passwordResetTokensTable.tokenHash, tokenHash), // url mathi get karelo tokenHash & DB ma store thayelo tokenHash same chhe ke nahi
                gte(passwordResetTokensTable.expiresAt, sql`CURRENT_TIMESTAMP`) // token Expired to nathi thayu ne...
            )
        );

    return data;
};

// Lec-119
export const clearResetPasswordToken = async (userId) => {
    return await db
        .delete(passwordResetTokensTable)
        .where(eq(passwordResetTokensTable.userId, userId));
};

// Lec-121 :- 
export async function getUserWithOauthId({ email, provider }) {
    const [user] = await db
        .select({
            id: usersTable.id,
            name: usersTable.name,
            email: usersTable.email,
            isEmailValid: usersTable.isEmailValid,
            providerAccountId: oauthAccountsTable.providerAccountId,
            provider: oauthAccountsTable.provider,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .leftJoin(
            oauthAccountsTable,
            and(
                eq(oauthAccountsTable.provider, provider),
                eq(oauthAccountsTable.userId, usersTable.id)
            )
        );

    return user;
}

export async function linkUserWithOauth({
    userId,
    provider,
    providerAccountId,
    // avatarUrl,
}) {
    // Insert a new row in "oauth_accounts" table.
    await db.insert(oauthAccountsTable).values({
        userId,
        provider,
        providerAccountId,
    });

    // if (avatarUrl) {
    //     await db
    //         .update(usersTable)
    //         .set({ avatarUrl })
    //         .where(and(eq(usersTable.id, userId), isNull(usersTable.avatarUrl)));
    // }
}

export async function createUserWithOauth({
    name,
    email,
    provider,
    providerAccountId,
    // avatarUrl,
}) {
    const user = await db.transaction(async (trx) => { // Here we are using transaction to insert a new row in "oauth_accounts" & "users" tables. (kato banne table ma row insert thavi joiye, kato akoi ma nai)
        const [user] =
            await trx.insert(usersTable).values({
                email,
                name,
                // password: "",
                // avatarUrl,
                isEmailValid: true, // we know that google's email are valid
            }).$returningId();

        await trx.insert(oauthAccountsTable).values({
            provider,
            providerAccountId,
            userId: user.id,
        });

        return {
            id: user.id,
            name,
            email,
            isEmailValid: true, // not necessary
            provider,
            providerAccountId,
        };
    });

    return user;
}