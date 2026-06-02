import dotenv from "dotenv";
dotenv.config();

async function run() {
    try {
        const { db } = await import("./config/db.js");
        const { usersTable } = await import("./drizzle/schema.js");
        const res = await db.insert(usersTable).values({ name: "Test User", email: "test_insert_" + Date.now() + "@test.com", password: "password" }).$returningId();
        console.log("INSERT RESULT:", res);
        process.exit(0);
    } catch(err) {
        console.error("FAIL", err);
        process.exit(1);
    }
}
run();
