const { products, categories } = require('../data');

exports.getAllCategories = (req, res) => {
    res.json(categories);
};

exports.getProductsByCategory = (req, res) => {
    const categoryProducts = products.filter(p => p.categoryId === parseInt(req.params.id));
    res.json(categoryProducts);
};

exports.addCategory = (req, res) => {
    const category = {
        id: categories.length + 1,
        name: req.body.name
    };
    categories.push(category);
    res.status(201).json(category);
};