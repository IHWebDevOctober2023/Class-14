// The porpouse of this file is to seed the database with some initial data

const mongoose = require("mongoose");
const User = require("../models/User.model");
const usersArray = require("./users.json")

// we need to add the path to the .env file where the MONGO_DB_URI is saved
require("dotenv").config({path: "../.env"});
const mongo_uri = process.env.MONGO_DB_URI

mongoose.connect(mongo_uri)
    .then(() => console.log("Connected to mongo"))
    .then(() => {
        return User.insertMany(usersArray)
    })
    .then((usersData) => {
        console.log("Created users: ", usersData);
    })
    .catch((error) => console.log(error))
    .finally(() => mongoose.connection.close());