const mongoose = require('mongoose');
const Like = require('../models/like');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const responseHandler = require('../lib/response_handler');


module.exports ={
  getAll:
  async (req, res) => {
    const likes = await Like.find().populate('recipe').populate('user');
    res.send({
      error: false,
      message: 'All likes from the database',
      likes: likes
    });
  },
  getOne:
  async (req, res) =>{
    const like = await Like.findById(req.params.id).populate('recipe').populate('user');
    res.send({
      error:false,
      message: `Like with id #${like._id}`,
      like : like
    });
  },

  create:
  async (req, res) => {
    console.log(req.body);
    const like = await Like.create(req.body);
    res.send({
      error: false,
      message: 'New like has been created',
      like: like
    });
  },

  patch:
  async (req, res) => {
    await Like.findByIdAndUpdate(req.params.id, req.body);
    const like = await Like.findById(req.params.id);
    res.send({
      error: false,
      message: `Like with id #${like._id} has been updated`,
      like: like
    });
  },

  delete:
  async (req, res) => {
    await Like.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: `Like with id #${req.params.id} has been deleted`
    });
  }
}