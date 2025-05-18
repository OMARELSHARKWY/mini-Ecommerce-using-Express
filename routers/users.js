const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router
  .route('/api/users')
  .get(usersController.getAllUsers)
  .post(usersController.addUser);

router
  .route('/api/users/:id')
  .get(usersController.getUserById)
  .put(usersController.replaceUser)
  .delete(usersController.deleteUser);

module.exports = router;
