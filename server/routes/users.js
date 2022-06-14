var express = require('express');
var router = express.Router();
const controller = require('../controllers/users');


router.get('/', controller.getAll)
      .post('/login', controller.login)
      .get('/:id', controller.getOne)
      .post('/', controller.create)
      .post('/like', controller.likeUnlike)
      .patch('/:id', controller.patch)
      .delete('/:id', controller.delete)

module.exports = router;