var mongoose = require("mongoose");

var likeSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
  }
});

module.exports = mongoose.model("like", likeSchema);
