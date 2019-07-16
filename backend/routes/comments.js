const express = require('express');
const CommentsController = require("../controllers/comments")
//const checkAuth = require('../middleware/check-auth');
//const extractFile = require('../middleware/file');
const router = express.Router();

//We are only passing the reference of functions like createPost and not executing them - createPost() because it should not be executed immediately but only when there is a re
  
  
  router.get("/:postId", CommentsController.getComments);

  router.post("/postId", CommentsController.postComment);
  

  module.exports = router;