const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postController = require("./controllers/post.controller");
const commentController = require("./controllers/comment.controller");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("", postController);
app.use("", commentController);

async function startServer() {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.95n1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      { useUnifiedTopology: true, useNewUrlParser: true }
    );
    app.listen(PORT, () => {
      console.log(`Server started on ${PORT} port`);
    });
  } catch (error) {
    console.log(error);
  }
}
startServer();
