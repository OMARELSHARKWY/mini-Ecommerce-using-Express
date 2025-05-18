const Product = require('../models/products');

const seedProduct = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: "iPhone 14", price: 999, categoryId: 1 },
      { name: "Samsung Galaxy S22", price: 899, categoryId: 1 },
      { name: "MacBook Pro 16", price: 2399, categoryId: 2 },
      { name: "Dell XPS 13", price: 1199, categoryId: 2 },
      { name: "Apple Watch Series 8", price: 399, categoryId: 3 },
      { name: "Sony WH-1000XM5", price: 349, categoryId: 4 },
      { name: "iPad Air", price: 599, categoryId: 2 },
      { name: "Google Pixel 7", price: 799, categoryId: 1 },
      { name: "Lenovo ThinkPad X1", price: 1399, categoryId: 2 },
      { name: "JBL Flip 6", price: 129, categoryId: 4 }
    ]);
    console.log("✅ Sample products inserted");
  } else {
    console.log("ℹ️ Products already exist, seeding skipped");
  }
};

module.exports = seedProduct;
