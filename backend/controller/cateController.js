const Cate = require('../models/cateModel');
const postModel = require('../models/postModel');

const cateController = {
  addCate: async (req, res) => {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ message: 'Please enter category name' });
      const newCate = new Cate({ name });
      await newCate.save();
      return res
        .status(200)
        .json({ message: 'Add category successful', newCate });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getCates: async (req, res) => {
    try {
      const cates = await Cate.find();
      return res.status(200).json(cates);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
  getCateByName: async (req, res) => {
    const { name } = req.params;
    try {
      const cate = await Cate.findOne({ name });
      if (!cate) return res.status(400).json({ message: 'Category not found' });
      const postId = await Promise.all(
        cate.postId.map((id) => {
          return postModel.findById(id);
        })
      );
      return res.status(200).json(postId);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteCate: async (req, res) => {
    try {
      const cate = await Cate.findById(req.params.id);
      const post = await postModel.find({ category: cate.name });
      post.map(async (post) => {
        await postModel.findByIdAndDelete(post._id);
      });
      await Cate.findByIdAndDelete(req.params.id);

      return res
        .status(200)
        .json(
          `Delete category ${cate.name} and all posts in this category successful`
        );
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
module.exports = cateController;
