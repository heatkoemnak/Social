const router = require('express').Router();
const postController = require('../controller/postController');
const upload = require('../utils/multer');
const authController = require('../controller/authController');

router.post('/create-post', upload.single('image'), postController.createPost);
router.get('/get-all-post', postController.getAllPost);
router.get('/get-post-by-user-id/:id', postController.getPostByUserId);
router.post('/like-dislike/:id', postController.LikeUnLike);
router.delete('/delete-post/:id', postController.deletePost);
router.put('/update-post/:id', postController.updatePost);
router.get('/get-post/:username', postController.getPostByUsername);

module.exports = router;
