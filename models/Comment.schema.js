const { Schema, model } = require("mongoose");

const Comment = new Schema({
  id: { type: Number },
  postId: { type: Number },
  text: { type: String },
});

module.exports = model("Comment", Comment);
