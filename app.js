const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const path = require('path')

const openApiDocument = require('./swagger/openapi')
const seedProduct = require('./seedings/seedProduct')
require('dotenv').config();


const productsController = require('./controllers/productsController');
const categoriesController = require('./controllers/categoriesController');
const usersController = require('./controllers/usersController');
const cartController = require('./controllers/cartController');
const { error } = require('console');


const app = express();
app.use(morgan(":method :url :response-time"));
app.use(express.json())
const PORT = process.env.PORT || 5000;



app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(openApiDocument))
app.use('/swagger.json' , express.static(path.join(__dirname,'swagger.json')))



// PRODUCTS endpoints
app.get('/api/products', productsController.getAllProducts);
app.get('/api/products/:id', productsController.getProductById);        // خلي بالك هنا دي اللي هتهندل قبل السيرش يعني كدا السيرش مش هيشتغل
app.get('/api/products/search', productsController.searchProducts);
app.post('/api/products', productsController.addProduct);
app.put('/api/products/:id', productsController.replaceProduct);
app.patch('/api/products/:id', productsController.updateProduct);
app.delete('/api/products/:id', productsController.deleteProduct);

// CATEGORIES endpoints
app.get('/api/categories', categoriesController.getAllCategories);
app.get('/api/categories/:id/products', categoriesController.getProductsByCategory);
app.post('/api/categories', categoriesController.addCategory);

// USERS endpoints
app.get('/api/users', usersController.getAllUsers);
app.get('/api/users/:id', usersController.getUserById);
app.post('/api/users', usersController.addUser);
app.put('/api/users/:id', usersController.replaceUser);
app.delete('/api/users/:id', usersController.deleteUser);

// CART endpoints
app.get('/api/cart/:userId', cartController.getUserCart);
app.post('/api/cart/:userId/items', cartController.addToCart);
app.patch('/api/cart/:userId/items/:productId', cartController.updateCartItem);
app.delete('/api/cart/:userId/items/:productId', cartController.removeCartItem);
app.delete('/api/cart/:userId', cartController.clearCart);




mongoose.connect("mongodb://127.0.0.1:27017/EcommerceSystem")
.then( async()=>{
    console.log("Database Connected ✔")
    await seedProduct();
    app.listen(PORT, (req , res)=>{
    console.log(`server is runing on port ${PORT}`)
    console.log(`swagger doc available on http://localhost:${PORT}/api-docs`)
})
})
.catch(error=>console.log("database Error :" ,error))
