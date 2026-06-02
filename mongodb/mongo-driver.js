// Lec-53 :- connect NodeJS with MongoDB (Run :- $node mongo-driver.js)
// Lec-54 :- ExpressJS-MongoDB CRUD operations (Run :- $node mongo-driver.js)

import {MongoClient} from "mongodb";

// create instanse 
const client = new MongoClient("mongodb://127.0.0.1");
// To connect client with mongoDB's server (mongodb://localhost:27017)
await client.connect(); // it returns a promises

// To create a database
const db = client.db('mongodb_nodejs_db');

// To create collection(table) in our db
const userCollection = db.collection('users');

//! insert the data
// userCollection.insertOne({name:"Tirth Hirpara", age:21 });
// userCollection.insertMany([
//     {name:"Meet soni", role:"user", age:20 },
//     {name:"Jeni Mandani", role:"user", age:21 },
//     {name:"vrund patel", role:"admin", age:19 },
// ]);


//! Read the data
const users_cursor = userCollection.find();
// console.log(users_cursor);
// Now, iterate this cursor(object)
for await (const user of users_cursor){ // it also return promises
    console.log(user);
}
// OR
const users_cursor2 = await userCollection.find().toArray(); // it also return promises
console.log(users_cursor2)


//! Find a User
const user = await userCollection.findOne({name:"Jeni Mandani"});
console.log(user);
console.log(user._id.toHexString());

//! Update the data
// await userCollection.updateOne({name:"vrund patel"} , {$set : {age:30} });

//! Delete the data
// await userCollection.deleteOne({ name:"Meet soni" });

// const result = await userCollection.deleteMany({ role:"user" });
// console.log(`${result.deletedCount} documents are deleted!`);
