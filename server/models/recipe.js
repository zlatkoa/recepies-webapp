const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  people: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
  },
  picture: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model('recipe', recipeSchema);