const express = require('express');
const cors = require("cors");
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddlewair = require('./middleware/error');

const allowedOrigins = [
  'http://192.168.29.155:3000',
  'http://localhost:3000',
  'http://0.0.0.0:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
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