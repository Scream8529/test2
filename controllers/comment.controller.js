const Router = require("express");
const router = new Router();
const CommentService = require("../services/comment.service");

router.get("/comment", CommentService.getComments);

router.post("/comment", CommentService.addComment);
router.post("/comment/comment", CommentService.editComment);
router.delete("/comment", CommentService.deleteComment);

module.exports = router;
