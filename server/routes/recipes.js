var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');
const upload = require('../utilities/upload/multer');



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