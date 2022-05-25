const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const responseHandler = require('../lib/response_handler');


module.exports ={
  getAll:
  async (req, res) => {
    const recipes = await Recipe.find().populate ('creator');
    res.send({
      error: false,
      message: 'All recepies from the database',
      recipes: recipes
    });
  },
  
  getOne:
  async (req, res) =>{
    const recipe = await Recipe.findById(req.params.id);
    res.send({
      error:false,
      message: `Recipe with id #${recipe._id}`,
      recipe : recipe
    });
  },

  create:
  async (req, res) => {
    const recipe = await Recipe.create(req.body);
    res.send({
      error: false,
      message: 'New recipe has been created',
      recipe: recipe
    });
  },

  patch:
  async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    const recipe = await Recipe.findById(req.params.id);
    res.send({
      error: false,
      message: `Recipe with id #${recipe._id} has been updated`,
      recipe: recipe
    });
  },

  delete:
  async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.send({
      error: false,
      message: `Recipe with id #${req.params.id} has been deleted`
    });
  }
}