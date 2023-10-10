const userModel = require('../models/userModel');
const postModel = require('../models/postModel');

const bcrypt = require('bcrypt');
const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await userModel.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getUserByUsername: async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username });
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  UpdateUserAccount: async (req, res) => {
    const { username, email, password, profilePicture, coverPicture } =
      req.body;

    const user = await userModel.findById(req.user);
    const currentUser = await userModel.findById(req.params.id);
    if (currentUser._id !== user._id) {
      return res
        .status(400)
        .json({ message: 'You can update only your account' });
    } else {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        try {
          const updatedUser = await userModel.findByIdAndUpdate(
            currentUser._id,
            {
              $set: {
                username,
                email,
                password: hashPassword,
                profilePicture,
                coverPicture,
              },
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        try {
          const updatedUser = await userModel.findByIdAndUpdate(
            currentUser._id,
            {
              $set: {
                username,
                email,
              },
            },
            { new: true }
          );
          res.status(200).json(updatedUser);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    }
  },

  DeleteUserAccount: async (req, res) => {
    const user = await userModel.findById(req.user);
    const currentUser = await userModel.findById(req.params.id);
    if (currentUser.id !== user.id) {
      return res
        .status(400)
        .json({ message: 'You can delete only your account' });
    } else {
      try {
        await postModel.deleteMany({ userId: currentUser._id });
        await userModel.findByIdAndDelete(currentUser._id);
        res.status(200).json('Account has been deleted');
      } catch (err) {
        res.status(500).json(err);
      }
    }
  },
};

module.exports = userController;
