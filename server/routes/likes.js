var express = require('express');
var router = express.Router();
const controller = require('../controllers/likes');
const { expressjwt: jwt } = require('express-jwt');
const response = require('../lib/response_handler');

require('dotenv').config();

router.use(jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'] 
}).unless({
      path: [
            {
                  url: /^\/likes\/recipe\/.*/, methods: ['GET']
            }
      ]
}));

router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
            response(res, 401, 'Unauthorized access');
      }
});


router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
        response(res, 401, 'Unauthorized access');
      }
    });


router.get('/', controller.getAll)
      .get('/:id', controller.getOne)
      .get('/user/:id', controller.countByUserId)
      .get('/recipe/:id', controller.countByRecipeId)
      .post('/user/', controller.likedByUserId)
      // .post('/', controller.create)
      // .patch('/:id', controller.patch)
      // .delete('/:id', controller.delete)

module.exports = router;