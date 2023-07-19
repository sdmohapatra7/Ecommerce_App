require('dotenv').config({path:'backend/.env'});
const app = require('./app');

const connectDataase = require('./config/database');
connectDataase();

app.listen(process.env.PORT,()=>{
    console.log(`server is working on http:/localhost:${process.env.PORT}`);
});