// Lec-109 :- How to send Email directly in Gmail using "Resend"
// Lec-117 :- Send Reset-Password Email in Our Gmail using Resend-API

import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "Website <website@resend.dev>",
            to: [to],
            subject,
            html,
        });
        if (error) {
            return console.error({ error });
        }
        else {
            console.log(data);
        }
    }
    catch (error) {
        console.error(error);
    }
};