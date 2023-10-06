const router = require('express').Router();

const friendController = require('../controller/friendController');
router.post('/add-un-friend/:id', friendController.addUnfriend);
router.get('/all-follower-and-following-friend/:id', friendController.GetAllFollowerAndFollowing);
router.get('/get-followers/:username', friendController.getFollowersByUsername);
router.get('/get-followings/:username', friendController.getFollowingsByUsername);

module.exports = router;
