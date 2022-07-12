const mongoose = require('mongoose');
const Like = require('../models/like');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const response = require('../lib/response_handler');


module.exports ={
  getAll:
  async (req, res) => {
    const likes = await Like.find();
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
  

  // create:
  // async (req, res) => {
  //   console.log(req.body);
  //   const like = await Like.create(req.body);
  //   res.send({
  //     error: false,
  //     message: 'New like has been created',
  //     like: like
  //   });
  // },

  // patch:
  // async (req, res) => {
  //   await Like.findByIdAndUpdate(req.params.id, req.body);
  //   const like = await Like.findById(req.params.id);
  //   res.send({
  //     error: false,
  //     message: `Like with id #${like._id} has been updated`,
  //     like: like
  //   });
  // },

  // delete:
  // async (req, res) => {
  //   await Like.findByIdAndDelete(req.params.id);
  //   res.send({
  //     error: false,
  //     message: `Like with id #${req.params.id} has been deleted`
  //   });
  // },
  countByUserId:
    async (req, res) =>{
      try{
        const like = await Like.countDocuments({ user: req.params.id } );
        res.send({
          error:false,
          message: `User #${req.params.id} liked ${like} recipes`,
          like : like
        });
      }
      catch(error){
        response( res, 500,
          `The fetch for the likes failed the USer ID is wrong`
        )
    }
  },

  likedByUserId:
    async (req, res) =>{
      try{
        const like = await Like.find({ user: req.body.user, recipe: req.body.recipe });
        res.send({
          error:false,
          message: `This user have likes`,
          like : like
        });
      }
      catch(error){
        response( res, 500,
          `The fetch for the likes failed the USer ID is wrong`
        )
    }
  },
  countByRecipeId:
    async (req, res) =>{
      try{
        const like = await Like.countDocuments({ recipe: req.params.id } );
        res.send({
          error:false,
          message: `Recipe #${req.params.id} has ${like} likes`,
          like : like
        });
      }
      catch(error){
        response( res, 500,
          `The fetch for the likes failed the Recipe ID is wrong`
        )
    }
  }
}
