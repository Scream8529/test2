const Router = require("express");
const router = new Router();
const PostService = require("../services/post.service");

router.get("/posts", PostService.getAll);
router.get("/posts/post", PostService.getOne);
router.post("/posts/post", PostService.editPost);
router.post("/posts", PostService.createPost);
router.delete("/posts", PostService.deletePost);

module.exports = router;
