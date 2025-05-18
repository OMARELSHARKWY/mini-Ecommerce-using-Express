

const { productSchema } = require("../schemas/product.schema");
const Product = require("../models/products");

// Get all products
exports.getAllProducts = async (req, res ) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

/**
 * Get all products without using try catch using Error Middleware
 * we use Error Middleware With not expected error 
 */

// exports.getAllProducts = async (req, res , next) => {
//     const products = await Product.find();
//     throw new Error ("Custom Error")
//     res.status(200).json(products);
//     // res.status(500).json({ error: "Error fetching products" });
//     next(error)
// };

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error fetching product" });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { keyword, minPrice, maxPrice } = req.query;
    let filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const products = await Product.find(filter);
    if (products.length === 0)
      return res.status(404).json({ message: "No products found" });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error searching products" });
  }
};

// Add new product
exports.addProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      categoryId: req.body.categoryId,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
};

// Replace product (PUT)
exports.replaceProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const replacedProduct = await Product.findOneAndReplace(
      { _id: req.params.id },
      {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId,
      },
      { new: true, runValidators: true }
    );

    if (!replacedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.json(replacedProduct);
  } catch (error) {
    res.status(500).json({ error: "Can not replace product" });
  }
};

// Update product (PATCH)
exports.updateProduct = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        categoryId: req.body.categoryId,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Can not update product" });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ error: "Error deleting product" });
  }
};
