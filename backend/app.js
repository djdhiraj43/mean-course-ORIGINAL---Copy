const path = require("path");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require("./routes/user");

const app = express();

mongoose.connect("mongodb+srv://admin:"+ process.env.MONGO_ATLAS_PW +"@cluster0-h5lhb.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Connection failed");
    console.log(err);
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));
app.use("/images", express.static(path.join("backend/images"))); //express.static is used for granting access to /imges folder. Also /images path is mapped to backend/images.

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
})

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
module.exports = app;
