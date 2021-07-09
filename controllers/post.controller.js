const Router = require("express");
const router = new Router();
const PostService = require("../services/post.service");

router.get("/posts", PostService.getAll);
router.get("/posts:id", PostService.getOne);
router.post("/posts", PostService.createPost);
router.delete("/posts:id", PostService.deletePost);

module.exports = router;
