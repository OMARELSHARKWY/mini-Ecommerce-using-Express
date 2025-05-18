const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    id:{
        type: Number,
        required : false
    },
    name:{
        type: String,
        required : [true,"name is required and must be string"],
    },
    price:{
        type: Number,
        required : [true,"price is required"],
        min:[0,"Price must be grater than 0"]
    },
    categoryId:{
        type: Number,
        required : [true,"categoryId is required"]
    }
})

const product = mongoose.model('product',productSchema);
module.exports = product;