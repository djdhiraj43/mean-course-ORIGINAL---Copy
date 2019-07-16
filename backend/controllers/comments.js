const Comment = require('../models/comment');
const mongoose = require('mongoose');

exports.getComments = (req, res, next) => {
    const post_id = mongoose.Types.ObjectId(req.params.postId);
    const postQuery = Comment.find({"post_id": post_id});
    let fetchedComments;
    postQuery.then(comments => {
      fetchedComments = comments;
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