const joi = require('joi');

const productSchema = joi.object({
    id: joi.number().optional(),
    name: joi.string().required().description("Product Name"),
    price: joi.number().required().description("The Price Of Product"),
    categoryId: joi.number().required()
});

module.exports = {productSchema}