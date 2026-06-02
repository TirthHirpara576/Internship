// Lec-56 :- Intoduction to Mongoose (Run :- $node mongoose.test.js)

/*
import mongoose from "mongoose";
// step-1 :- Establish connection to mongoDB server
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_database"); // url/db_name
    mongoose.set("debug",true); // mongoose ma apde jetli-jetli queries run kariye tenu ouput aape...
}
catch(err){
    console.error(err);
    process.exit();
}

// step-2 :- Create schema (define structure of database)
const userSchema = mongoose.Schema({
    // name: String,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, // jyare aapde koi field -> "Unique" rakhiye -> tyare teno "index" pan create thai...
    age: {type: Number, required: true, min: 5},
    createdAt: {type: Date, default: Date.now()},
});

// step-3 :- Create model (kind of collection)
const Users =  mongoose.model("user",userSchema); // < "collection_name" (singular) , schema_name >

// insert data
await Users.create({ name: "Tirth" , age : 21 , email : "xyz123@gmail.com" });

// close the connection
await mongoose.connection.close();
*/





// Lec-57 :- Mongoose + ExpressJS CRUD operations (Run :- $node mongoose.test.js)

import mongoose from "mongoose";
// step-1 :- Establish connection to mongoDB server
try{
    await mongoose.connect("mongodb://127.0.0.1/mongoose_database"); // url/db_name
    mongoose.set("debug",true); // mongoose ma apde jetli-jetli queries run kariye tenu ouput aape...
}
catch(err){
    console.error(err);
    process.exit();
}

// step-2 :- Create schema (define structure of database)
const userSchema = mongoose.Schema({
    // name: String,
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, // jyare aapde koi field -> "Unique" rakhiye -> tyare teno "index" pan create thai...
    age: {type: Number, required: true, min: 5},
    createdAt: {type: Date, default: Date.now()},
});

// step-3 :- Create model (kind of collection)
const Users =  mongoose.model("user",userSchema); // < "collection_name" (singular) , schema_name >

// insert multiple data
const usersData = [
    { name: "Alice" , email : "alice@gmail.com" , age : 24 },
    { name: "Bob" , email : "bob@gmail.com" , age : 20 },
    { name: "Charlie" , email : "Charlie@gmail.com" , age : 29 },
];
// await Users.insertMany(usersData);

// Read the data
const users = await Users.find(); // Mongoose -> Powerful -> automatically data ne Array ma convert kari ne j aapi dei...
const users2 = await Users.find({age: {$gt: 25}}); // age>25
console.log(users2);

// Update the data
const updated_user = await Users.updateOne(
    {email:"bob@gmail.com"},
    // {$set: {age:25}} 
    {$inc: {age:1}}  // increment by 1
);
console.log(updated_user);

// Delete the data
const deleted_user = await Users.deleteOne( {email:"alice@gmail.com"} );
console.log(deleted_user);

// close the connection
await mongoose.connection.close();
