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
  UpdateUserAccountById: async (req, res) => {
    const { userId, username, email, password } = req.body;
    if (!userId || userId === '' || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    if (userId === req.params.id) {
      try {
        const updatedUser = await userModel.findByIdAndUpdate(
          userId,
          {
            $set: {
              username,
              email,
              password: hashPassword,
            },
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({ message: 'You can update only your account' });
    }
  },
  DeleteUserById: async (req, res) => {
    const { userId } = req.body;
    if (!userId || userId === '' || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    if (userId === req.params.id) {
      try {
        await userModel.findByIdAndDelete(userId);
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json({ message: 'You can delete only your account' });
    }
  },
};

module.exports = userController;
