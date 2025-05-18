const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router
  .route('/api/categories')
  .all((req, res, next) => {
    next();
  })
  .get(categoriesController.getAllCategories)
  .post(categoriesController.addCategory);

router
  .route('/api/categories/:id/products')
  .get(categoriesController.getProductsByCategory);

module.exports = router;
