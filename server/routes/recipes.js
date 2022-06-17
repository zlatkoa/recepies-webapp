var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const upload = require('../utilities/upload/multer');
const { expressjwt: jwt } = require('express-jwt');
const response = require('../lib/response_handler');

require('dotenv').config();

router.use(jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'] 
}).unless({
      path: [
            {
                  url: '/recipes/^\/category\/.*/', methods: ['GET']
            },
            {
                  url: '/recipes/popular', methods: ['GET']
            },
            {
                  url: '/recipes/latest', methods: ['GET']
            },
            {
                  url: '/recipes', methods: ['GET']
            }

      ]
}));

router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
            response(res, 401, 'Unauthorized access');
      }
})



router.get('/', controller.getAll)
      .get('/latest', controller.getLatest)
      .get('/user/:id', controller.getByUser)
      .get('/category/:category', controller.getByCategory)
      .get('/popular', controller.getMostPopular)
      .get('/:id', controller.getOne)
      .post('/', upload.single('picture'), controller.create)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;