const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const post = require("../models/post");

router.post("/", auth, async (req, res) => {
  post.create({ author: req.user._id, text: req.body.text }, (err, newPost) => {
    if (err) {
      res.send(err);
    } else {
      res.send(newPost);
    }
  });
});
module.exports = router;
