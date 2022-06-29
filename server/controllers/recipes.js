const mongoose = require('mongoose');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const response = require('../lib/response_handler');
const fs = require('fs');


module.exports = {
  getAll:
    async (req, res) => {
      const recipes = await Recipe.find().populate('creator');
      res.send({
        error: false,
        message: 'All recepies from the database',
        recipes: recipes
      });
    },

  getOne:
    async (req, res) => {
      const recipe = await Recipe.findById(req.params.id);
      res.send({
        error: false,
        message: `Recipe with id #${recipe._id}`,
        recipe: recipe
      });
    },

  getLatest:
    async (req, res) => {
      const recipes = await Recipe.find().sort({ $natural: -1 }).limit(12);
      res.send({
        error: false,
        message: 'Latest 3 recipes from the database',
        recipes: recipes
      });
    },

  create:
    async (req, res) => {
      try {
        req.body.likes = 0;
        req.body.category = req.body.category.toLowerCase();
        req.body.picture = `images/${req.file.filename}`
        const recipe = await Recipe.create(req.body);
        res.send({
          error: false,
          message: 'New recipe has been created',
          recipe: recipe
        });

      }
      catch (error) {
        response(res, 500,
          `Creation of new recepie failed`
        )
      }
    },

  patch:
    async (req, res) => {
      const oldRecipe = await Recipe.findById(req.params.id);
      if (req.file) {
        fs.unlink('public/' + oldRecipe.picture, (err) => {
          if (err) {
            console.log(err)
          }
        })
        req.body.picture = `images/${req.file.filename}`
      } else {
        req.body.picture = oldRecipe.picture;
      }
      await Recipe.findByIdAndUpdate(req.params.id, req.body);
      const recipe = await Recipe.findById(req.params.id);
      console.log(req.body)
      res.send({
        error: false,
        message: `Recipe with id #${recipe._id} has been updated`,
        recipe: recipe
      });
    },

  delete:
    async (req, res) => {
      const oldRecipe = await Recipe.findById(req.params.id);
      fs.unlink('public/' + oldRecipe.picture, (err) => {
        if (err) {
          console.log(err)
        }
      })
      await Recipe.findByIdAndDelete(req.params.id);
      res.send({
        error: false,
        message: `Recipe with id #${req.params.id} has been deleted`
      });
    },

  getByUser:
    async (req, res) => {
      try {
        const recipes = await Recipe.find({ creator: req.params.id });

        if (recipes.length > 0) {
          res.send({
            error: false,
            message: `All recipes from user #${req.params.id}`,
            recipes: recipes
          })
        }
        else {
          response(res, 201,
            `User #${req.params.id} has no recipes in the DB`,
            { error: true, recipes: [] }

          );
        }
      }
      catch (error) {
        response(res, 500,
          `The fetch for the recipes failed the USer ID is wrong`

        )
      }
    },
  getByCategory:
    async (req, res) => {
      try {
        const category = req.params.category.toLowerCase();
        const recipes = await Recipe.find({ category: category });
        if (recipes.length > 0) {
          res.send({
            error: false,
            message: `Recipes for the category ${req.params.category}`,
            recipes: recipes
          })
        } else {
          res.send({
            error: true,
            message: `There are no recepies from category #${req.params.category} `,
            recipes: recipes
          });
        }
      }
      catch (error) {
        response(res, 500,
          `The fetch for the recipes by category ${req.params.category}  failed`
        )
      }
    },
  getMostPopular:
    async (req, res) => {
      try {
        const recipes = await Recipe.aggregate(
          [
            { $sort: { likes: -1 } }
          ]
        ).limit(6);
        res.send({
          error: false,
          message: `Most popular ${recipes.length} recipes`,
          recipes: recipes
        });
      }
      catch (error) {
        response(res, 500,
          `The fetch for the recipes by popularity failed`
        )
      }
    }
}