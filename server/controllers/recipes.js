const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const response = require('../lib/response_handler');


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

  getLatest:
  async (req, res) => {
    const recipes = await Recipe.find().sort({$natural:-1}).limit(3);
    res.send({
      error: false,
      message: 'Latest 3 recipes from the database',
      recipes: recipes
    });
  },

  create:
  async (req, res) => {
    req.body.likes = 0;
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
  },

  getByUser:
  async(req, res) =>{  
    try{
      const recipe = await Recipe.find( {creator : req.params.id});

      if (recipe.length>0){
        res.send({
          error: false,
          message: `All recipes from user #${req.params.id}`,
          recipe: recipe
        })       
      } 
      else {          
            response( res, 201,
              `User #${req.params.id} has no recipes in the DB`
            );
        }
    }
    catch(error){
      response( res, 500,
        `The fetch for the recipes failed the USer ID is wrong`
      )
    }
  }
}