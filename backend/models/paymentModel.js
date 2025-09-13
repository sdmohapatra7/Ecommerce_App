// models/paymentModel.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: "Order",
        required: true,
    },
    method: {
        type: String,
        enum: ["COD", "Razorpay", "PayU"],
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Success", "Failed"],
        default: "Pending",
    },
    transactionId: {
        type: String, // Razorpay Order ID, PayU txnId, etc.
    },
    amount: {
        type: Number,
        required: true,
    },
    paymentDetails: {
        type: Object, // raw response from gateway
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);
