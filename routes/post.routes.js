const router = require("express").Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer();

router.get("/", postController.readPost);
router.get("/get/:id", postController.getPost);
router.get("/getall/:id", postController.getPostsfromUser);
router.get("/random", postController.randomPost);
router.post("/", upload.single("file"), postController.createPost);
router.put("/:id", postController.vote);
router.put("/publish/:id", postController.publish);
router.patch("/add/:id", postController.AddResponse);
router.delete("/:id", postController.deletePost);

router.patch("/like-post/:id", postController.likePost);
router.patch("/unlike-post/:id", postController.unlikePost);

module.exports = router;
