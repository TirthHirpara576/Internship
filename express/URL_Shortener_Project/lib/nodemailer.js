// Lec-101 :- How to send email using Nodemailer

import nodemailer from "nodemailer";

const testAccount = await nodemailer.createTestAccount(); // mare link console ma print karavvani chhe..

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: "asa.littel32@ethereal.email",
        pass: "hUswyPUDHdY8GVKAg1",
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    const info = await transporter.sendMail({
        from: `'URL SHORTENER' < ${testAccount.user} >`, // Mail kone moklyo chhe? -> Ethereal account
        to, // Mail ko ne moklvo chhe? -> User's email
        subject, // Mail no subject
        html, // Mail no content
    });

    const testEmailURL = nodemailer.getTestMessageUrl(info); // This method will return the URL
    console.log("verify Email: ", testEmailURL); // Print the URL in console. (copy that URL & paste in browser to check the mail)
};