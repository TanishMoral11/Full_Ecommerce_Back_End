/**
 * This will be the starting file of the project 
 * matlab jab bhi hume apna server start karna hoga , to wo yahi se start hoga
 */

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();

//Now , i am import my server.confif.js file
const server_config = require("./configs/server.config");
//Now , i am import my db.confif.js file
const db_config = require("./configs/db.config");

/**
 * Define user schema and model
 */
const userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    email: String,
    userType: String,
    password: String
});

const User = mongoose.model('User', userSchema);

/**
 * create an admin user at the starting of the application
 * If not already present
 */
async function init() {


    let user = await User.findOne({ userId: "admin" });

    try{
        if (user) {
                console.log("Admin Is Already Present");
                return;
            }
    }
    catch(err){
        console.log("Error While Reading The Data", err);
    }
    

    try {
        user = await User.create({
            name: "Tanish",
            userId: "admin",
            email: "ishantmoral@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("TanishMoral", 8)
        });
        console.log("Admin Created", user);
    } catch (err) {
        console.log("Error While Create Admin", err);
    }
}

/**
 * Connection with mongodb
 */
mongoose.connect(db_config.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});

db.once("open", () => {
    console.log("Connected To MongoDB");
    init();
});

/**
 * Start the server
 */
app.listen(server_config.PORT, () => {
    console.log("Server Is Started At Port Number : ", server_config.PORT);
});
