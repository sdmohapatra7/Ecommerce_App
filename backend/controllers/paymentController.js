// controllers/paymentController.js
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Order = require("../models/orderModel");

// ✅ Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------------
// Create Payment (COD / Online)
// -------------------------
exports.createPayment = async (req, res) => {
    try {
        const { orderId, method } = req.body;
        const order = await Order.findById(orderId);

        if (!order) return res.status(404).json({ message: "Order not found" });

        let paymentData = {
            user: req.user._id,
            order: order._id,
            method,
            amount: order.totalPrice,
        };

        // COD
        if (method === "COD") {
            paymentData.status = "Success";
            const payment = await Payment.create(paymentData);

            order.paymentInfo = {
                id: payment._id,
                status: "Cash On Delivery",
            };
            await order.save();

            return res.status(201).json({ success: true, payment });
        }

        // Razorpay
        if (method === "Razorpay") {
            const options = {
                amount: order.totalPrice * 100, // amount in paise
                currency: "INR",
                receipt: `order_rcptid_${order._id}`,
            };

            const razorpayOrder = await razorpay.orders.create(options);

            return res.status(201).json({
                success: true,
                razorpayOrder,
                orderId: order._id,
                key_id: process.env.RAZORPAY_KEY_ID,
            });
        }

        // PayU (just an example payload)
        if (method === "PayU") {
            // Prepare PayU hash and payload
            // (Integration differs, needs payu SDK or manual POST)
            return res.status(201).json({
                success: true,
                message: "Redirect to PayU Payment Page",
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// -------------------------
// Verify Razorpay Payment
// -------------------------
exports.verifyRazorpay = async (req, res) => {
    try {
        const { orderId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid Signature" });
        }

        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Order not found" });

        const payment = await Payment.create({
            user: req.user._id,
            order: order._id,
            method: "Razorpay",
            status: "Success",
            transactionId: razorpay_payment_id,
            amount: order.totalPrice,
            paymentDetails: req.body,
        });

        order.paymentInfo = {
            id: razorpay_payment_id,
            status: "Success",
        };
        order.orderStatus = "Confirmed";
        await order.save();

        res.status(200).json({ success: true, payment });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
