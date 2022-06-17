var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');
const { expressjwt: jwt } = require('express-jwt');
const response = require('../lib/response_handler');

require('dotenv').config();

router.use(jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'] 
}).unless({
      path: [        
            {
                  url: '/users', methods: ['POST']
            },
            {
                  url: '/users/login', methods: ['POST']
            }
      ]
}));


router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
        response(res, 401, 'Unauthorized access');
      }
    });


router.get('/', controller.getAll)
      .post('/login', controller.login)
      .get('/:id', controller.getOne)
      .post('/', controller.create)
      .post('/like', controller.likeUnlike)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;