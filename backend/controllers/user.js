const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Post = require('../models/post');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User ({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result => {
                    return res.status(201).json({
                        message: "User created successfully",
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Invalid authentication credentials!"
                    });
                });
        });
}

exports.userLogin = (req, res, next) => {
    console.log("in user controller login"); //
    let fetchedUser;
    User.findOne({email: req.body.email}).then(user => {
        if(!user) {
            return res.status(401).json({
                message: "Auth failed!"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
        if(!result) {
            return res.status(401).json({
                message: "Auth failed!"
            });
        }
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, process.env.JWT_KEY, {expiresIn: "1h"});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id  //uesrId is part of token & we dont need to pass it but we are doing so to improve front end performance
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: "Invalid authentication credentials!"
        });
    })
}

exports.getAuthor = (req, res, next) => {
    let fetchedPosts;
    let url = req.originalUrl;
    let url_ = url.split("/");
    //console.log(url_[0]+url_[1]+url_[2]+url_.length);
    //console.log("url_ : "+url_);
    if(url_[3] == "posts") {
        Post.find({creator: req.params.authorId})
        .then(documents => {
            fetchedPosts = documents;
            return Post.count();
          })
          .then(count => {
            res.status(200).json({
              message: "Authors posts fetched successfully",
              posts: fetchedPosts,
              maxPosts: count
            })
          })
          .catch(error => {
            res.status(500).json({
              message: "Fetching authors posts failed!"
            })
          });
    }
    else {
    User.findOne({_id: req.params.authorId}).then(author => {
        if(author) {
          res.status(200).json(author);
        } else {
          res.status(404).json({message:"Author not found !"});
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Fetching author failed!"
        })
      });
    }
    };