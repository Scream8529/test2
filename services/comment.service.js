const CommentSchema = require("../models/Comment.schema");

class CommentService {
  async getComments(req, res) {
    const comments = await CommentSchema.find({ postId: req.query.id });
    return res.status(200).json({ statusCode: 0, comments });
  }
  async addComment(req, res) {
    const comment = await new CommentSchema({
      postId: req.body.id,
      text: req.body.text,
    });
    comment.save();
    return res.status(200).json({ statusCode: 0, message: "Comment created" });
  }
  async deleteComment(req, res) {
    const comment = await CommentSchema.find({ id: req.query.id });
    comment.remove();
    return res
      .status(200)
      .json({ statusCode: 0, message: "Comment has been deleted" });
  }
  async editComment(req, res) {
    const comment = await CommentSchema.find({ id: req.body.id });
    comment.text = req.body.text;
    comment.save();
    return res.status(200).json({ statusCode: 0, message: "Ok" });
  }
}
module.exports = new CommentService();
