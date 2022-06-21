const mongoose = require('mongoose');
const User = require('../models/user');
const Recipe = require('../models/recipe');
const Like = require ('../models/like');
const response = require('../lib/response_handler');
const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


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
      req.body.password = bcrypt.hashSync(req.body.password);
  
      user = await User.create(req.body);  
      response(res, 201, 'New user has been created', { user });
    } 
    catch (error) {
      response(res, 500, error.msg);
    }
  },

  login:
  async (req, res) => {
    try {
      /**
       * Tuka korisnikot ispratil email i password
       * 1. Od baza probaj da zemes korisnik so dadeniot email
       * 2. Treba da proveram dali postoi korisnik so toj email
       * 2.a. Dokolku postoi, da gi sporedam password-ite
       * 2.a.1 Dokolku passwordite se ok, vrakjam token
       * 2.a.2 Dokolku passwordite ne se ok, vrakjam response za invalid credentials
       * 2.b. Dokolku ne postoi, da vratam nekakov response za invalid credentials
       */
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // token = plain data (JSON payload) + secret key za potpisuvanje na token + config options
          const payload = {
            id: user._id,
            email: user.email,
            first_name: user.first_name
          }
  
          const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '5d'
          });
  
          response(res, 200, 'You have logged in successfully', { token, payload })
        } else {
          response(res, 401, 'Invalid credentials');
        }
      } else {
        response(res, 401, 'Invalid credentials');
      }
    } catch (error) {
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
          }),
          await Recipe.updateOne( {_id : req.body.recipe}, { $inc: {likes: -1}})
          response( res, 201,
            `User #${req.body.user} has has deleted the recipe #${req.body.recipe}.`
          );
             
      } 
      else {
          await Like.create({ user: req.body.user, recipe: req.body.recipe }),
          await Recipe.updateOne( {_id : req.body.recipe}, { $inc: {likes: 1}}),
          response( res, 201,
            `User with id #${req.body.user} has created like for the recipe #${req.body.recipe}.`
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
