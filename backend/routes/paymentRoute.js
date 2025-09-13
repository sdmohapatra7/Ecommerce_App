// routes/paymentRoute.js
const express = require("express");
const { createPayment, verifyRazorpay } = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.post("/payment", isAuthenticatedUser, createPayment);
router.post("/payment/verify", isAuthenticatedUser, verifyRazorpay);

module.exports = router;
