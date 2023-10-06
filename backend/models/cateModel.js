// category Model
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
let CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    postId: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Category', CategorySchema);
