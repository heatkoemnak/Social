const userModel = require('../models/userModel');

const friendController = {
  addUnfriend: async (req, res) => {
    const { friend_id } = req.body;
    try {
      const currentUser = await userModel.findById(req.params.id);
      const friendUser = await userModel.findById(friend_id);
      const isFriend = currentUser.followings.includes(friend_id);
      if (!isFriend && !currentUser._id == friend_id)
        return res
          .status(400)
          .json({ message: 'You are not friend with this user' });

      if (req.params.id == friend_id) {
        return res.status(400).json('You cant follow yourself');
      }

      if (isFriend) {
        await currentUser.updateOne({ $pull: { followings: friend_id } });
        await friendUser.updateOne({ $pull: { followers: req.params.id } });
        res.status(200).json('User has been un followed');
      } else {
        await currentUser.updateOne({ $push: { followings: friend_id } });
        await friendUser.updateOne({ $push: { followers: req.params.id } });
        res.status(200).json('User has been followed');
      }
    } catch (err) {
      return res.status(400).json({ message: 'friend could not find!.' });
    }
  },
  GetAllFollowerAndFollowing: async (req, res) => {
    try {
      const currentUser = await userModel.findOne({
        username: req.params.username
      });
      const followingFriend = await Promise.all(
        currentUser.followings.map((friendId) => {
          return userModel.findById(friendId);
        })
      );
      let followingFriendList = [];
      followingFriend.map((friend) => {
        const { _id, username, profilePicture } = friend;
        followingFriendList.push({ _id, username, profilePicture });
      });

      const followerFriend = await Promise.all(
        currentUser.followers.map((friendId) => {
          return userModel.findById(friendId);
        })
      );
      let followerFriendList = [];
      followerFriend.map((friend) => {
        const { _id, username, profilePicture } = friend;
        followerFriendList.push({ _id, username, profilePicture });
      });
      return res.status(200).json({ followerFriendList, followingFriendList });
    } catch (err) {
      return res.status(400).json({ message: 'User could not find' });
    }
  },

  getFollowingsByUsername: async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username });
      const followings = await Promise.all(
        user.followings.map((followingId) => {
          return userModel.findById(followingId);
        })
      );
      let followingList = [];
      followings.map((following) => {
        const { _id, username, profilePicture } = following;
        followingList.push({ _id, username, profilePicture });
      });

      return res.status(200).json(followingList);
    } catch (err) {
      return res.status(400).json({ message: 'User could not find' });
    }
  },
  getFollowersByUsername: async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username });
      const followers = await Promise.all(
        user.followers.map((followerId) => {
          return userModel.findById(followerId);
        })
      );
      let followerList = [];
      followers.map((follower) => {
        const { _id, username, profilePicture } = follower;
        followerList.push({ _id, username, profilePicture });
      });

      return res.status(200).json(followerList);
    } catch (err) {
      return res.status(400).json({ message: 'User could not find' });
    }
  },
};
module.exports = friendController;
