import dotenv from "dotenv";
dotenv.config();

async function run() {
    try {
        const { sendNewVerifyEmailLink } = await import("./services/auth.services.js");
        await sendNewVerifyEmailLink({ email: "test@example.com", userId: 1 });
        console.log("Done");
    } catch(err) {
        console.error("FAIL", err);
    }
}
run();
