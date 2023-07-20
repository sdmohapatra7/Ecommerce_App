const express = require('express');

const app = express();

const errorMiddlewair = require('./middleware/error');

app.use(express.json());

//routes imports
const product = require('./routes/productRoute');
app.use('/api/v1/',product);

//middlewaire for error
app.use(errorMiddlewair);

module.exports = app;