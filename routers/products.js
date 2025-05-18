const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController')

router
    .route('/api/products')
    .all((req,res,next)=>{
        next()
    })
    .get(productController.getAllProducts)
    .post(productController.addProduct)


router
    .route('/api/products/:id')
    .get(productController.getProductById)
    .put(productController.replaceProduct)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct)
    

    module.exports = router;