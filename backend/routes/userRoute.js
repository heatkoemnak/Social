const router = require('express').Router();
const userController = require('../controller/userController');

router.get('/all-user', userController.getAllUser);
router.get('/:username', userController.getUserByUsername);
router.put('/:id', userController.UpdateUserAccountById);
router.delete('/:id', userController.DeleteUserById);

module.exports = router;
