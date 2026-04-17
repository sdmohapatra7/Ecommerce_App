const express = require('express');
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddlewair = require('./middleware/error');

const allowedOrigins = [
  'http://192.168.137.1:3000',
  'http://localhost:3000',
  'http://0.0.0.0:3000'
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman or mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//routes imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const cart = require('./routes/cartRoute');
const payment = require("./routes/paymentRoute");

app.use("/api/v1", payment);
app.use('/api/v1/',product);
app.use('/api/v1/',user);
app.use('/api/v1/',order);
app.use('/api/v1/',cart);
//middlewaire for error
app.use(errorMiddlewair);

module.exports = app;