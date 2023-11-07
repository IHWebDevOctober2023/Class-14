const express = require("express");

const server = express();

const mongoose = require("mongoose");

require("dotenv").config();
const mongo_uri = process.env.MONGO_DB_URI

mongoose.connect(mongo_uri)
    .then(()=> console.log("Connected to mongo"))



server.listen(3000,()=> console.log("😁 server running"))