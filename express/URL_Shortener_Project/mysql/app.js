// Lec-62 :- How to connect mySQL with ExpressJS  (RUN:- $cd mysql , $node app.js)

import mysql from "mysql2/promise"; // I'm gone a use Promises valu version.

// 1: to connect with mysql server
const db = await mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "tirth1234",
   database: "mysql_db", 
});
console.log("MYSQL connected successfully!");

// 2: create db
// await db.execute('CREATE database mysql_db');
// console.log(await db.execute("show databases "));

// 3: create a table
// await db.execute(`
//     CREATE TABLE students(
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         name VARCHAR(100) NOT NULL,
//         email VARCHAR(100) NOT NULL UNIQUE
//     );
// `);

// 4: is to perform CRUD operation

//! CREATE (Insert student) (Using Inline values)
// await db.execute(`
//     INSERT INTO students (name, email) VALUES
//     ("Tirth", "tirth@gmail.com"),
//     ("Alice", "alice@gmail.com"),
//     ("Bob", "bob@gmail.com")
// `);

// OR (Using Prepared statements) (Best Practice)
// await db.execute(
//     `INSERT INTO students (name, email) VALUES (?, ?)`,
//     ["Meet", "meet@gmail.com"]
// );

// multiple values Insertion :-
// const values = [
//     ["Charlie", "charlie@gmail.com"],
//     ["Emma", "emma@gmail.com"],
//     ["Devid", "devid@gmail.com"],
// ];
// await db.query(`INSERT INTO students (name, email) VALUES ?`,[values]);

//! READ 
const [rows] = await db.execute(` SELECT * FROM students `);
console.log(rows);

// READ (Get single student by ID)
const [singleStudent] = await db.execute(
    `SELECT * FROM students WHERE id = ?`,
    [1]
);
console.log("Single Student:", singleStudent);

// UPDATE (Update student age or name)
// const [updateResult] = await db.execute(
//     `UPDATE students SET name = ? WHERE id = ?`,
//     ["Tirth Hirpara", 1]
// );
// console.log("Updated Rows:", updateResult.affectedRows);

// DELETE (Delete student)
// const [deleteResult] = await db.execute(
//     `DELETE FROM students WHERE id = ?`,
//     [4]
// );
// console.log("Deleted Rows:", deleteResult.affectedRows);