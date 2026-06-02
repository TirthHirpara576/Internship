// Lec-80 :- How to verify JWT 
/*
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyAuthentication = (req, res, next) => { // "next" means Jevu middle nu kam puru thai atle next middleware par javanu
    const token = req.cookies.access_token; // for verifing the token -> first we have to get the token from the cookies
    if (!token) { // if user is not logged in
        req.user = null;
        return next(); // move to the next middleware 
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET); // if user is logged in but token is invalid, then it will throw an error, so we have to catch that error using try-catch block
        req.user = decoded_token;
        console.log(`req.user : `, req.user);
        return next();
    } catch (error) {
        req.user = null;
        return next(); // move to the next middleware
    }
}
*/


// Lec-92 :- Refreshing access_token when it expires (session+JWT)

import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY, } from "../config/constants.js";
import { refreshTokens, verifyJWTToken } from "../services/auth.services.js";

// ✔️ You can add any property to req, but:

// Avoid overwriting existing properties.
// Use req.user for authentication.
// Group custom properties under req.custom if needed.
// Keep the data lightweight.

export const verifyAuthentication = async (req, res, next) => {
    // ✅ Extract/Get access_token and refresh_token from cookies.
    const accessToken = req.cookies.access_token;
    const refreshToken = req.cookies.refresh_token;

    req.user = null; // 2 mathi ak pan token na hoi -> that means user j nathi... -> So, req.user = null

    if (!accessToken && !refreshToken) { // ✅ If neither token exists, move to the next middleware (return next()). --> Because, user already Logout.
        return next();
    }

    // If an access token is already present (means, user a logout pan nathi karyu & Login thayo teni 10min pan nathi thayee..) :-
    if (accessToken) {
        const decodedToken = verifyJWTToken(accessToken); // Try to decode and verify it using verifyJWTToken(accessToken).
        req.user = decodedToken; // If valid, attach the decoded data(id,name,email) to req.user & move forward.
        return next();
    }

    // ✅ If the access token is missing or invalid, check the refresh token is present ?
    if (refreshToken) {
        try {
            const result = await refreshTokens(refreshToken); // Call refreshTokens(refreshToken) to generate a new access & refresh token.
            if (!result) return next();

            const { newAccessToken, newRefreshToken, user } = result;

            req.user = user; // Attach user data to req.user

            const baseConfig = { httpOnly: true, secure: true };

            // Store the new tokens in the user's cookies.
            res.cookie("access_token", newAccessToken, {
                ...baseConfig,
                maxAge: ACCESS_TOKEN_EXPIRY,
            });

            res.cookie("refresh_token", newRefreshToken, {
                ...baseConfig,
                maxAge: REFRESH_TOKEN_EXPIRY,
            });

            return next(); // Proceed to the next middleware.
        }
        catch (error) {
            console.log(error.message);
        }
    }

    return next(); // move to the next middleware.
};