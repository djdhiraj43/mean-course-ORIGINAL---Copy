const Comment = require('../models/comment');
const mongoose = require('mongoose');

exports.getComments = (req, res, next) => {
    const postId = mongoose.Types.ObjectId(req.params.postId);
    console.log("ObjectId type: "+typeof(postId));
    const postQuery = Comment.find({"postId": postId});
    let fetchedComments;
    postQuery.then(comments => {
      fetchedComments = comments;
      console.log("Fetched Comments : "+fetchedComments);
      return Comment.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Comments fetched successfully",
        comments: fetchedComments,
        maxComments: count
      })
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching comments failed!"
      })
    });
  };

  exports.postComment = (req, res, next) => {
    const postId = mongoose.Types.ObjectId(req.body.postId);
    const comment = new Comment({
      postId: postId,
      createdDate: req.body.createdDate,
      comment: req.body.comment,
      authorName: req.body.authorName,
      comments: req.body.comments
    });
    console.log("comment : "+comment);
    comment.save().then(createdComment => {
      return res.status(201).json({
        message:"Comment added successfully",
        comment: {
          postId: createdComment.postId,
          createdDate: createdComment.createdDate,
          comment: createdComment.comment,
          authorName: createdComment.authorName,
          comments: createdComment.comments
        }
      });
    })
    .catch(err => {
      console.log("Error : "+err);
      res.status(500).json({
        message: "Creating a comment failed!"
      })
    });
  }