const Comment = require('../models/comment');
const mongoose = require('mongoose');

exports.getComments = (req, res, next) => {
    const postId = mongoose.Types.ObjectId(req.params.postId);
    console.log("ObjectId type: "+typeof(postId));
    const postQuery = Comment.find({"postId": postId});
    let fetchedComments;
    postQuery.then(comments => {
      fetchedComments = comments;
      //console.log("Fetched Comments : "+fetchedComments);
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
    console.log("comment : "+JSON.stringify(comment));
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

  exports.nestedComment = (req, res, next) => {
    var iden = req.body.id;    
    var comment = new Comment;
    comment_ =  {
        "createdDate": req.body.createdDate,
        "comment": req.body.comment,
        "authorName": req.body.authorName,
        "level": req.body.level,
        "commentId": new mongoose.Types.ObjectId(),
        "replyId": req.body.replyId
      }
    
      //delete comment_.id;
    //comment.save();
    /*
    const comment = new Comment({
      createdDate: req.body.createdDate,
      comment: req.body.comment,
      authorName: req.body.authorName,
      level: req.body.level,
      commentId: new mongoose.Types.ObjectId(),
      replyId: req.body.replyId
    });*/
    console.log("comment_ ---- : "+JSON.stringify(comment_));
    console.log("id : "+ iden);
    console.log("type : "+typeof(iden));
    comment.updateOne(
      { "_id": iden},
      { "$push": { "comments": comment_ } } ,
        function (err, raw) {
        if(err) { 
          //return console.log(`err : ${err}`) ;
          return err;
        };
        console.log('The raw response from Mongo was ', raw);
        }
    )/*.then(result => {
      if(result.n > 0) {
        res.status(200).json({message: "Update successful!"});
      } else {
        res.status(401).json({message: "Not authorized!"});
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update post!"
      })
    });
    
    /*.then(createdComment => {
      return res.status(201).json({
        message:"Comment added successfully",
        comment: {
          createdDate: createdComment.createdDate,
          comment: createdComment.comment,
          authorName: createdComment.authorName,
          level: createdComment.level,
          commentId: createdComment.commentId,
          replyId: createdComment.replyId
        }
      });
    })
    .catch(err => {
      console.log("Error : "+err);
      res.status(500).json({
        message: "Creating a comment failed!"
      })
    }); */
  }