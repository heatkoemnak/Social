const router = require('express').Router();
const userController = require('../controller/userController');

router.get('/all-user', userController.getAllUser);
router.get('/:username', userController.getUserByUsername);
router.put('/', userController.UpdateUserAccount);
router.delete('/delete', userController.DeleteUserById);

module.exports = router;
