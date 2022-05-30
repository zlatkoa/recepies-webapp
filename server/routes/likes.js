var express = require('express');
var router = express.Router();
const controller = require('../controllers/likes');


router.get('/', controller.getAll)
      .get('/:id', controller.getOne)
      .get('/user/:id', controller.countByUserId)
      .get('/recipe/:id', controller.countByRecipeId)
      // .post('/', controller.create)
      // .patch('/:id', controller.patch)
      // .delete('/:id', controller.delete)

module.exports = router;