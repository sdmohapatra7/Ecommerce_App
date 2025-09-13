export const orderConfirmationTemplate = (order) => {
  return `
    <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:auto;">
      <h2>Thank you for your order!</h2>
      <p>Hello ${order.user?.name || "Customer"},</p>
      <p>Your order <strong>#${order._id}</strong> has been placed successfully.</p>
      <p><strong>Total:</strong> ₹${order.totalPrice}</p>
      <p><strong>Status:</strong> ${order.orderStatus}</p>
      <p>We'll notify you as soon as your order is shipped.</p>
      <hr/>
      <p style="font-size:12px;color:#888;">If you have any questions, contact our support team.</p>
    </div>
  `;
};

export const orderStatusUpdateTemplate = (order) => {
  return `
    <div style="font-family:Arial, sans-serif; color:#333; max-width:600px; margin:auto;">
      <h2>Order Status Update</h2>
      <p>Hello ${order.user?.name || "Customer"},</p>
      <p>Your order <strong>#${order._id}</strong> status has been updated to:</p>
      <h3 style="color:#007BFF;">${order.orderStatus}</h3>
      ${
        order.orderStatus === "Delivered"
          ? "<p>We hope you enjoy your purchase! Thank you for shopping with us.</p>"
          : "<p>We'll notify you when the next update is available.</p>"
      }
      <hr/>
      <p style="font-size:12px;color:#888;">If you have any questions, contact our support team.</p>
    </div>
  `;
};

export const ForgotPasswordTemplate =(resetPasswordUrl)=>{
    return `
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <p>Dear User,</p>

    <p>You are receiving this email because a request was made to reset the password for your <strong>ESmart</strong> account.</p>

    <p>
      Please click the link below to reset your password:<br>
      <a href="${resetPasswordUrl}" style="color: #1a73e8;">Reset Password</a>
    </p>

    <p><strong>Note:</strong> This link will expire in 15 minutes.</p>

    <p>If you did not request a password reset, please ignore this email. Your account remains secure.</p>

    <p>Best regards,<br>
    <strong>ESmart Team</strong></p>
  </body>
</html>
`;
};

// utils/emailTemplates/paymentConfirmedTemplate.js

export const  paymentConfirmedTemplate =(order) =>{
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Order Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          background: #ffffff;
          margin: 20px auto;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          overflow: hidden;
        }
        .header {
          background: #4CAF50;
          color: white;
          text-align: center;
          padding: 20px;
        }
        .header h1 {
          margin: 0;
        }
        .content {
          padding: 20px;
          color: #333;
        }
        .order-info {
          margin: 15px 0;
          padding: 10px;
          background: #f1f1f1;
          border-radius: 6px;
        }
        .items {
          margin-top: 15px;
        }
        .items p {
          margin: 5px 0;
        }
        .total {
          font-weight: bold;
          font-size: 16px;
          margin-top: 15px;
          text-align: right;
        }
        .footer {
          background: #f1f1f1;
          padding: 15px;
          text-align: center;
          font-size: 12px;
          color: #555;
        }
        .btn {
          display: inline-block;
          background: #4CAF50;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>✅ Payment Received</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${order.user?.name || "Customer"}</strong>,</p>
          <p>We’re excited to inform you that we’ve received your payment and your order has been confirmed! 🎉</p>

          <div class="order-info">
            <p><strong>Order ID:</strong> ${order._id}</p>
            <p><strong>Status:</strong> ${order.orderStatus}</p>
            <p><strong>Payment:</strong> ${order.paymentInfo?.status}</p>
          </div>

          <div class="items">
            <h3>Order Summary:</h3>
            ${order.orderItems
              .map(
                (item) =>
                  `<p>${item.name} × ${item.quantity} — ₹${
                    item.price * item.quantity
                  }</p>`
              )
              .join("")}
          </div>

          <p class="total">Total Paid: ₹${order.totalPrice}</p>

          <a href="${process.env.FRONTEND_URL}/orders" class="btn">
            View My Orders
          </a>
        </div>
        <div class="footer">
          <p>Thank you for shopping with <strong>ESmart</strong>!  
          We’ll notify you when your order is shipped.</p>
        </div>
      </div>
    </body>
  </html>
  `;
};
