const router = require('express').Router();
const authController = require('../controller/authController');
const auth = require('../Middleware/auth');

const upload = require('../utils/multer');

router.post('/register', upload.single('image'), authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/user', auth, authController.getUser);

module.exports = router;
