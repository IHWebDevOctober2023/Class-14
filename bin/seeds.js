const mongoose = require("mongoose");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const usersArray = require("./users.json")

require("dotenv").config();
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