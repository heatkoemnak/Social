const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const Cate = require('../models/cateModel');

const cloudinary = require('../utils/cloudinary');

const PostController = {
  async createPost(req, res) {
    const { title, category } = req.body;
    const image = req.file;
    try {
      const result = await cloudinary.uploader.upload(image.path, {
        folder: 'social',
      });
      const cate = await Cate.find({
        name: category,
      });
      const newPost = new postModel({
        desc: title,
        post_image: result.secure_url,
        userId: req.user,
        category,
      });

      await newPost.save();
      const cateId = cate.map((cate) => cate._id);
      await Cate.findByIdAndUpdate(cateId, {
        $push: { postId: newPost._id },
      });

      await userModel.findByIdAndUpdate(
        req.user,
        {
          $push: { posts: newPost._id },
        },
        { new: true, useFindAndModify: false }
      );

      res.status(200).json(newPost);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getAllPost(req, res) {
    try {
      const posts = await postModel.find().sort({ createdAt: -1 });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getPostByUsername: async (req, res) => {
    try {
      const user = await userModel.findOne({ username: req.params.username });
      const posts = await postModel.find({
        userId: user._id,
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getPostByUserId(req, res) {
    try {
      const currentUser = await userModel.findById(req.params.id);
      const posts = await Promise.all(
        currentUser.posts.map((postId) => {
          return postModel.findById(postId);
        })
      );
      let postList = [];
      posts.map((post) => {
        const { ...all } = post._doc;
        postList.push(all);
      });

      return res.status(200).json(postList);
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  },
  async deletePost(req, res) {
    try {
      const post = await postModel.findById(req.params.id);
      const cate = await Cate.find({
        name: post.category,
      });
      const cateId = cate.map((cate) => cate._id);
      await Cate.findByIdAndUpdate(cateId, {
        $pull: { postId: post._id },
      });
      await post.deleteOne();
      await userModel.findByIdAndUpdate(
        req.user,
        {
          $pull: { posts: post._id },
        },
        { new: true, useFindAndModify: false }
      );
      await post.save();

      res.status(200).json('The post has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async LikeUnLike(req, res) {
    try {
      const post = await postModel.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json('The post has been liked');
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json('The post has been disliked');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updatePost(req, res) {
    try {
      const post = await postModel.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res.status(200).json('The post has been updated');
      } else {
        res.status(403).json('You can update only your post');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = PostController;
