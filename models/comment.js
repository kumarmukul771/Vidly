var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  text: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  },
});

module.exports = mongoose.model("comment", commentSchema);
