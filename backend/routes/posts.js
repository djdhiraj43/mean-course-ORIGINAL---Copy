const express = require('express');
const PostController = require("../controllers/posts")
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file');
const router = express.Router();

//We are only passing the reference of functions like createPost and not executing them - createPost() because it should not be executed immediately but only when there is a request
router.post("", checkAuth, extractFile, PostController.createPost);
  
  router.put("/:id", checkAuth, extractFile, PostController.updatePost);
  
  router.get("", PostController.getPosts);
  
  router.get("/:id", PostController.getPost);
  
  router.delete("/:id", checkAuth, PostController.deletePost);
  
  module.exports = router;