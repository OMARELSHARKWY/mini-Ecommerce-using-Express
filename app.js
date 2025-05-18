const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const swaggerUi = require('swagger-ui-express');
const path = require('path')

const openApiDocument = require('./swagger/openapi')
const seedProduct = require('./seedings/seedProduct')
const productRouter = require('./routers/products')
const categoriesRouter = require('./routers/categories')
const cartRouter = require('./routers/cart')
const usersRouter = require('./routers/users')
require('dotenv').config();


const productsController = require('./controllers/productsController');
const categoriesController = require('./controllers/categoriesController');
const usersController = require('./controllers/usersController');
const cartController = require('./controllers/cartController');

const app = express();
app.use(morgan(":method :url :response-time"));
app.use(express.json())
const PORT = process.env.PORT || 5000;



app.use('/api-docs' , swaggerUi.serve , swaggerUi.setup(openApiDocument))
app.use('/swagger.json' , express.static(path.join(__dirname,'swagger.json')))




//Routers
app.use(productRouter)
app.use(categoriesRouter)
app.use(usersRouter)
app.use(cartRouter)


// Not Found Middleware
app.use((req,res)=>{
    res.status(404).json({message: "Specified Endpoint is not Found"})
})

// Error Middleware
app.use((error,req,res,next)=>{
    res.status(500).json({message : `Error Occured , ${error}`})
})

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
