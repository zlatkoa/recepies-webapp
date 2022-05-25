const mongoose = require('mongoose');
const User = require('../models/user');
const responseHandler = require('../lib/response_handler');


module.exports ={
  getAll:
  async (req, res) => {
    const users = await User.find();
    res.send({
      error: false,
      message: 'All users from the database',
      users: users
    });
  },
  getOne:
  async (req, res) =>{
    const user = await User.findById(req.params.id);
    res.send({
      error:false,
      message: `User with id #${user._id}`,
      user : user
    });
  },

  create:
  async (req, res) => {
    const user = await User.create(req.body);
    res.send({
      error: false,
      message: 'New user has been created',
      user: user
    });
  },

  patch:
  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    const user = await User.findById(req.params.id);
    res.send({
      error: false,
      message: `User with id #${user._id} has been updated`,
      user: user
    });
  },

  delete:
  async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: `User with id #${req.params.id} has been deleted`
    });
  }
}