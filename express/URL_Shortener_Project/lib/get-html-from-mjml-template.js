// Lec-116 :- Create Beautiful MJML Template for Reset-Password

import fs from "fs/promises";
import path from "path";
import ejs from "ejs";
import mjml2html from "mjml";

export const getHtmlFromMjmlTemplate = async (template, data) => { // "template" is string (name of the file) & "data" is Object containing dynamic data (name, link)
    // 1: we need to read the data
    const mjmlTemplate = await fs.readFile(
        path.join(import.meta.dirname, "..", "emails", `${template}.mjml`),
        "utf-8"
    );

    // 2: we need to replace the placeholder (name, link) into their Actual values
    const filledTemplate = ejs.render(mjmlTemplate, data);

    // 3: we need to convert that file into html file
    return mjml2html(filledTemplate).html;
};