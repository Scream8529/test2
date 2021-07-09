const { Schema, model } = require("mongoose");

const Post = new Schema({
  id: { type: Number },
  tittle: { type: String },
  body: { type: String },
});

module.exports = model("Post", Post);
