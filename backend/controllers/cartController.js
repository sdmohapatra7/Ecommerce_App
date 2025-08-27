const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Add or Update Cart Item
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                cartItems: [{
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.images[0].url
                }],
                totalPrice: product.price * quantity
            });
        } else {
            const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity = quantity; // set exact quantity
            } else {
                cart.cartItems.push({
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    quantity,
                    image: product.images[0].url
                });
            }

            cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
        }

        // 🔥 populate product before returning so frontend always gets consistent JSON
        const populatedCart = await Cart.findById(cart._id).populate("cartItems.product");

        res.status(200).json({ success: true, cart: populatedCart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get Cart Items
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id })
            .populate("cartItems.product", "name price stock images"); // 👈 Add stock here

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Remove Cart Item
exports.removeCartItem = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user._id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== productId);
        cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();

        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Clear Cart
exports.clearCart = async (req, res) => {
    await Cart.findOneAndDelete({ user: req.user._id });
    res.status(200).json({ success: true, message: "Cart cleared" });
};
