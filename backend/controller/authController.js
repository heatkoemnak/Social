// Require
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      if (!username || !email || !password) {
        return res.status(401).json({ message: 'please filed the form!' });
      }
      if (!email.includes('@') || !email.includes('.')) {
        return res.status(401).json({ message: 'Invalid email format!' });
      }
      if (username.length < 3 || password.length < 6) {
        return res
          .status(401)
          .json({ message: 'use at least 3 or 6 characters' });
      }
      // check for existing users with same credentials
      let existingUser = false;
      const users = await userModel.find();
      users.forEach((user) => {
        if (user.username === username || user.email === email) {
          existingUser = true;
          if (existingUser) {
            return res.status(401).json({ message: 'User already exists' });
          }
        }
      });
      const newUser = new userModel({
        username,
        email,
        password: hashPassword,
      });
      await newUser.save();

      return res.status(200).json({
        message: 'user registered successful',
        user: newUser,
        error: false,
      });
    } catch (err) {
      return res.json(err);
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await userModel.findOne({ email });
      if (!existingUser)
        return res
          .status(401)
          .json({ message: 'User not found. Please Signup!' });
      const isUserPassword = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isUserPassword)
        return res.status(400).json({ message: 'Invalid Password.' });
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        process.env.JWT_KEY
      );
      res.cookie('token', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 24 * 60 * 60 * 30),
        httpOnly: true,
      });

      return res.status(200).json({
        message: 'user logged in successful',
        user: existingUser,
        token,
      });
    } catch (err) {
      return res.status(401).json({ message: 'Un authentication' });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie('token');
      return res.status(200).json({ message: 'user logged out successful' });
    } catch (err) {
      return res.status(401).json({ message: 'Un authentication' });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await userModel.findById(req.user);
      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};

module.exports = authController;
