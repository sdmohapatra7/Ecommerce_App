const express = require('express');

const app = express();

const cookieParser = require('cookie-parser');

const errorMiddlewair = require('./middleware/error');

app.use(express.json());
app.use(cookieParser());

//routes imports
const product = require('./routes/productRoute');
const user = require('./routes/userRoute');
const order = require('./routes/orderRoute');
const cart = require('./routes/cartRoute');
app.use('/api/v1/',product);
app.use('/api/v1/',user);
app.use('/api/v1/',order);
app.use('/api/v1/',cart);
//middlewaire for error
app.use(errorMiddlewair);

module.exports = app;