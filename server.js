const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post.model");
const User = require("./models/User.model");

const hbs = require("hbs");
// 1. require the body-parser
const bodyParser = require('body-parser');

const server = express();
server.set("view engine", "hbs");
server.set("views", __dirname + "/views")

// 2. let know your app you will be using it
server.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();
const mongo_uri = process.env.MONGO_DB_URI

mongoose.connect(mongo_uri)
    .then(() => console.log("Connected to mongo"));

server.get("/post", (req, res) => {
    res.render("form")
});

server.post("/post", async (req, res) => {
    // const { title, content, author } = req.body;
    const { title, content, authorName } = req.body;
    try {
        const author = await User.find({ username: authorName })
        res.send(author)
        Post.create({ title, content, author: author[0]._id })
            .then((post) => {
                console.log("POST CREATED: ", post)
                return User.findByIdAndUpdate(author[0]._id, { $push: { posts: post._id } })
            })
            .catch((error) => console.log("I just need a nap", error));
    }
    catch (error) {
        console.log(error);
    }

});

server.get("/post/marta", (req, res) => {
    /*  Post.find({ author: "654a2a0098e2b4a924161691" })
         .then((postsArray) =>{
             
             res.render("posts", { postsArray })
             
         })
         .catch((error) => console.log(error))
  */

    User.findById("654a2a0098e2b4a924161691")
        .populate('posts') // --> we are saying: give me whole user object with this ID (posts represents an ID in our case)
        .then((user) => {
            const postsArray = user.posts;
            res.render("posts", { postsArray })
        })
        .catch((error) => console.log(error))
})

server.listen(3000, () => console.log("😁 server running"))