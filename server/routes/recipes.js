var express = require('express');
var router = express.Router();
const controller = require('../controllers/recipes');


router.get('/', controller.getAll)
      .get('/:id', controller.getOne)
      .post('/', controller.create)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;