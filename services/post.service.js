const PostSchema = require("../models/Post.schema");
const CommentSchema = require("../models/Comment.schema");

class PostService {
  async getAll(req, res) {
    try {
      const posts = await PostSchema.find();
      return res.status(200).json({ statusCode: 0, posts });
    } catch (error) {
      console.log(error);
    }
  }
  async getOne(req, res) {
    try {
      const post = await PostSchema.findOne({ id: req.query.id });
      const comments = await CommentSchema.find({ postId: req.query.id });
      return res.status(200).json({ statusCode: 0, post, comments });
    } catch (error) {
      console.log(error);
    }
  }
  async editPost(req, res) {
    try {
      const { id, tittle, body } = req.body;
      const post = await PostSchema.findOne({ id});
      if (!post) {
        return res.status(404).json({ message: "Post not find" });
      }
      post.tittle = tittle;
      post.body = body;
      post.save();
      return res.status(200).json({ statusCode: 0, post });
    } catch (error) {
      console.log(error);
    }
  }
  async deletePost(req, res) {
    try {
      const post = await PostSchema.findOne({ id: req.query.id });
      if (!post) {
        return res.status(404).json({ message: "Post not find" });
      }
      post.remove();
      return res
        .status(200)
        .json({ statusCode: 0, message: "Post has been deleted" });
    } catch (error) {
      console.log(error);
    }
  }
  async createPost(req, res) {
    try {
      const { tittle, body } = req.body;
      const post = new PostSchema({
        id: Date.now(),
        tittle,
        body,
      });
      post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new PostService();
