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

// Create route for listen counts
router.post("/", auth, function (req, res) {

  // Find Post using post id which is provided in req.body.post
  post.findById(req.body.post, function (err, foundPost) {
    if (err) console.log(err);
    else {
      //Find whether logged in user has already listened
      let index = foundPost.listens.findIndex((userId) => userId == req.user._id);

      if (index == -1) {
        // Listen post if user already not listened to it
        foundPost.listens.push(req.user._id);
        foundPost.save();

        let liked = {
          listened: "1",
        };

        res.send(foundPost);
      } else {
        // No effect if already listened
        // let updatedLikes = foundPost.likes.filter((userId) => {
        //   return !(userId == req.user._id);
        // });
        let liked = {
          listened: "1",
        };

        // foundPost.likes = updatedLikes;
        // foundPost.save();
        res.send(foundPost);
      }
    }
  });
});

router.get("/", auth, (req, res) => {
  post.findById(req.body.post, (err, foundPost) => {
    if (err) {
      console.log(err);
      let error = {
        error: "Unable to fetch",
      };

      res.send(error);
    } else {
      let count = {
        count: foundPost.listens.length,
      };

      res.send(count);
    }
  });
});

module.exports = router;
