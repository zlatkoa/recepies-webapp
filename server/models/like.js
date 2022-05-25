const mongoose = require('mongoose');

const likeSchema = mongoose.Schema({
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: 'recipe',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },

}, { timestamps: true });

module.exports = mongoose.model('like', likeSchema);