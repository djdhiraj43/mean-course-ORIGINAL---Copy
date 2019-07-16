const Comment = require('../models/comment');

exports.getComments = (req, res, next) => {
    const postQuery = Comment.find({"_id": req.params.postId});
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