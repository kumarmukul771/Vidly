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

// Create route for comment
router.post("/", auth, function (req, res) {
  comment.create(req.body.comment, function (err, newComment) {
    if (err) console.log("Comment could not be added");
    else {
      post.findById(req.body.post, function (err, foundPost) {
        if (err) console.log(err);
        else {
          foundPost.comments.push(newComment);
          foundPost.save();
          res.send(foundPost);
        }
      });
    }
  });
});

router.get("/", auth, (req, res) => {
  post
    .findById(req.body.post)
    .populate("comments")
    .exec((err, foundPost) => {
      if (err) {
        let error = {
          error: "Unable to fetch"
        };

        res.send(error);
      } else {
        res.send(foundPost);
      }
    });
});
module.exports = router;
