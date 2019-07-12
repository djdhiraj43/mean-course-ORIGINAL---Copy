const express = require('express');
const UserController = require("../controllers/user")
//const checkAuth = require('../middleware/check-auth');
//const extractFile = require('../middleware/file');
const router = express.Router();
const app = express();

//We are only passing the reference of functions like createPost and not executing them - createPost() because it should not be executed immediately but only when there is a re
  
  
  router.get("/:authorId", UserController.getAuthor);
  

  module.exports = router;