const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const post = require("../models/post");
const comment = require("../models/comment");
const like = require("../models/like");

// Total listens on profile
router.post("/", auth, (req, res) => {
  console.log(req.body.userid);

  post.find({ author: req.body.userid }, (err, foundPost) => {
    if (err) {
      console.log(err);
      let error = {
        error: "Unable to fetch",
      };

      res.send(error);
    } else {
      let totalListenCount = 0;

      foundPost.map((post) => {
        totalListenCount += post.listens.length;
      });

      let response = {
        totalListenCount: totalListenCount,
      };

      res.send(response);
    }
  });
});

module.exports = router;
