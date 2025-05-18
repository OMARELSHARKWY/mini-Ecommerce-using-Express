const { cart, products } = require('../data');
const Cart = require('../models/cart')

exports.getUserCart = (req, res) => {
    const userCart = cart.find(c => c.userId === parseInt(req.params.userId));
    if (!userCart) return res.status(404).send('Cart not found');
    
    // Enrich cart items with product details
    const enrichedItems = userCart.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return { ...item, product };
    });
    
    res.json({ ...userCart, items: enrichedItems });
};

exports.addToCart = (req, res) => {
    const userCart = cart.find(c => c.userId === parseInt(req.params.userId));
    if (!userCart) return res.status(404).send('User not found');
    
    const product = products.find(p => p.id === req.body.productId);
    if (!product) return res.status(404).send('Product not found');
    
    const existingItem = userCart.items.find(item => item.productId === req.body.productId);
    if (existingItem) {
        existingItem.quantity += req.body.quantity || 1;
    } else {
        userCart.items.push({
            productId: req.body.productId,
            quantity: req.body.quantity || 1
        });
    }
    
    res.status(201).json(userCart);
};

exports.updateCartItem = (req, res) => {
    const userCart = cart.find(c => c.userId === parseInt(req.params.userId));
    if (!userCart) return res.status(404).send('User not found');
    
    const item = userCart.items.find(i => i.productId === parseInt(req.params.productId));
    if (!item) return res.status(404).send('Item not found in cart');
    
    if (req.body.quantity) {
        item.quantity = req.body.quantity;
    }
    
    res.json(userCart);
};

exports.removeCartItem = (req, res) => {
    const userCart = cart.find(c => c.userId === parseInt(req.params.userId));
    if (!userCart) return res.status(404).send('User not found');
    
    const index = userCart.items.findIndex(i => i.productId === parseInt(req.params.productId));
    if (index === -1) return res.status(404).send('Item not found in cart');
    
    userCart.items.splice(index, 1);
    res.status(204).send();
};

exports.clearCart = (req, res) => {
    const userCart = cart.find(c => c.userId === parseInt(req.params.userId));
    if (!userCart) return res.status(404).send('User not found');
    
    userCart.items = [];
    res.status(204).send();
};