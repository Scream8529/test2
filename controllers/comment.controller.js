const Router = require("express");
const router = new Router();
const CommentService = require("../services/comment.service");

router.get("/comment", CommentService.getComments);
router.post("/comment", CommentService.editComment);
router.post("/comment:id", CommentService.deleteComment);

module.exports = router;
