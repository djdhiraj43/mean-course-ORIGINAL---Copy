const Comment = require('../models/comment');
const mongoose = require('mongoose');

var MongoClient = require('mongodb').MongoClient
  , format = require('util').format;

exports.getComments = (req, res, next) => {
    const postId = mongoose.Types.ObjectId(req.params.postId);
    console.log("ObjectId type: "+typeof(postId));
    const postQuery = Comment.find({"refId": postId});
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
    const comment_ =  {
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
    
    MongoClient.connect("mongodb+srv://admin:"+ process.env.MONGO_ATLAS_PW +"@cluster0-h5lhb.mongodb.net/node-angular?retryWrites=true", { useNewUrlParser: true }, function(err, client) {
if(err) {
  throw err;
} else {
  console.log("Connected to the db");
  console.log("DB --- : "+JSON.stringify(db));
}

var db = client.db('node-angular');

db.collection('comments').updateOne(
  {_id: mongoose.Types.ObjectId(iden)}, // query
  {$push: {comments: comment_}}, // replacement, replaces only the field "hi"
  {}, // options
  function(err, object) { 
      if (err){
          console.warn("Error ------ : "+err);  // returns error if no matching object found
          res.status(401).json({status:0, message: "Comment failed!"});
      }else{
          console.dir(object);
          res.status(200).json({status:1, message: "Comment posted!"});
      }
  })
});


    /*comment.updateOne(
      { "_id": mongoose.Types.ObjectId(iden)},
      { "$push": { "comments": comment_ } } ,
        function (err, raw) {
        if(err) { 
          throw err ;
          //return err;
        };
        console.log('The raw response from Mongo was ', raw);
        }
    )
    
    
    /*.then(result => {
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