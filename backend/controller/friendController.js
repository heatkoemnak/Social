const userModel = require('../models/userModel');

const friendController = {
  addUnfriend: async (req, res) => {
    const { friend_id } = req.body;
    try {
      const currentUser = await userModel.findById(req.user);

      if (currentUser.followings.includes(friend_id)) {
        await currentUser.updateOne({ $pull: { followings: friend_id } });
        await userModel.updateOne(
          { _id: friend_id },
          { $pull: { followers: req.user } }
        );
        const followings = currentUser.followings.length;
        res.status(200).json('Follow');
      } else {
        await currentUser.updateOne({ $push: { followings: friend_id } });
        await userModel.updateOne(
          { _id: friend_id },
          { $push: { followers: req.user } }
        );
        // const followers = currentUser.followers.length;

        res.status(200).json('Unfollow');
      }
    } catch (err) {
      return res.status(400).json({ message: 'friend could not find!.' });
    }
  },
  GetAllFollowerAndFollowing: async (req, res) => {
    try {
      const currentUser = await userModel.findOne({
        username: req.params.username,
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
        const { ...all } = following._doc;
        followingList.push(all);
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
        const { ...all } = follower._doc;
        followerList.push(all);
      });

      return res.status(200).json(followerList);
      // return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: 'User could not find' });
    }
  },
  getFollowersByUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.user);
      const followers = await Promise.all(
        user.followers.map((followerId) => {
          return userModel.findById(followerId);
        })
      );
      let followerList = [];
      followers.map((follower) => {
        const { ...all } = follower._doc;
        followerList.push(all);
      });

      return res.status(200).json(followerList);
      // return res.status(200).json(user);
    } catch (err) {
      return res.status(400).json({ message: 'User could not find' });
    }
  },
};
module.exports = friendController;
