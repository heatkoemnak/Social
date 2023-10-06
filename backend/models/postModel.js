const mongoose = require('mongoose');

const PostSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      require: true,
      
    },
    post_image: {
      type: String,
      default: '',
      required: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    share: {
      type: Array,
      default: [],
    },
    category: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Post', PostSchema);
