// Lec-58 :- Mongoose middleware in our Express application (Run :- $node middleware.test.js)
/*
import mongoose from "mongoose";

// step-1 :- Establish connection to mongoDB server
try{
    await mongoose.connect("mongodb://localhost:27017/middleware_db"); // url/db_name
    mongoose.set("debug",true); // mongoose ma apde jetli-jetli queries run kariye tenu ouput aape...
}
catch(err) {
    console.error(err);
    process.exit();
}

// step-2 :- Create schema (define structure of database)
const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, // jyare aapde koi field -> "Unique" rakhiye -> tyare teno "index" pan create thai...
    age: {type: Number, required: true, min: 5},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
});

// Use Middleware = pre-save -> data ne save karavta pella kaik kam karavvu hoi to...
// userSchema.pre("save" , function(next){
//     this.set({ updatedAt :  Date.now() }); // bydefault in middeleware , we get "this" keyword.
//     next(); // aa middleware pachhi, next je kam chhe (insertion) te chalu j rakhvanu
// }); 
// OR
// but I am not saving the data, I am updating the data. To aa case ma manually lakhvu pade
userSchema.pre(["updateOne","updateMany","findOneAndUpdate"] , function(next){
    this.set({ updatedAt :  Date.now() }); // bydefault in middeleware , we get "this" keyword.
}); 

// step-3 :- Create model (kind of collection)
const Users =  mongoose.model("user",userSchema); // < "collection_name" (singular) , schema_name >

// insert multiple data
const usersData = [
    { name: "Alice" , email : "alice@gmail.com" , age : 24 },
    { name: "Bob" , email : "bob@gmail.com" , age : 20 },
];
// await Users.insertMany(usersData);

// Now, I want to update "age", but "updatedAt" will not update automatically.  
const updated_user = await Users.updateOne(
    {email:"bob@gmail.com"},
    {$set: {age:30}} 
);
console.log(updated_user);

// close the connection
await mongoose.connection.close();
*/





// Lec-59 :- Mongoose Challenge (Run :- $node middleware.test.js)
import mongoose from "mongoose";

try{
    await mongoose.connect("mongodb://localhost:27017/middleware_db"); // url/db_name
    mongoose.set("debug",true); // mongoose ma apde jetli-jetli queries run kariye tenu ouput aape...
}
catch(err) {
    console.error(err);
    process.exit();
}

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, // jyare aapde koi field -> "Unique" rakhiye -> tyare teno "index" pan create thai...
    age: {type: Number, required: true, min: 5},
},
{
    timestamps: true,
}
);


const Users =  mongoose.model("user",userSchema); // < "collection_name" (singular) , schema_name >

// Now, I want to update "age", but "updatedAt" will not update automatically.  
const updated_user = await Users.updateOne(
    {email:"bob@gmail.com"},
    {$set: {age:14}} 
);
console.log(updated_user);

// close the connection
await mongoose.connection.close();
