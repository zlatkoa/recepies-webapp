const mongoose = require('mongoose');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Like = require ('../models/like');
const response = require('../lib/response_handler');
const user = require('../models/user');
const req = require('express/lib/request');


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
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return response( res, 400, 
          'User with the email: '+req.body.email+' allready exists in the database' 
        );
      }  
      //req.body.password = bcrypt.hashSync(req.body.password);
  
      user = await User.create(req.body);  
      response(res, 201, 'New user has been created', { user });
    } 
    catch (error) {
      response(res, 500, error.msg);
    }
  },

  patch:
  async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body);
    const user = await User.findById(req.params.id);
    res.send({
      error: false,
      message: `Hey, your data with id #${user._id} has been updated`,
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
  },

  likeUnlike:
  async(req, res) =>{  
    try{
      const like = await Like.findOne({ user : req.body.user , recipe: req.body.recipe });

      if (like){
        await Like.findOneAndDelete({    
            $and: [{ user: req.body.user }, { recipe: req.body.recipe }]
          },
          response( res, 201,
            `User #${req.body.user} has has liked the recipe #${req.body.recipe}.`
          )
        );         
      } 
      else {
          await Like.create({ user: req.body.user, recipe: req.body.recipe },
            response( res, 201,
              `User with id #${req.body.user} has deleted like for the recipe #${req.body.recipe}.`
            )
          );
        }
    }
    catch(error){
      response( res, 500,
        `The like/unlike request failed`
      )
    }
  }
}
