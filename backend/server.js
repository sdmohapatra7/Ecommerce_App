require('dotenv').config({path:'backend/.env'});
const app = require('./app');
const PORT = process.env.PORT || 4000; // make sure PORT in .env matches
const HOST = process.env.HOST || '0.0.0.0';
//handle Uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Uncaught Exception`);
    process.exit(1);
});

const connectDataase = require('./config/database');
connectDataase();

const server = app.listen(PORT,HOST,()=>{
    // console.log(`server is working on http:/localhost:${process.env.PORT}`);
    console.log(`Server is running at http://${HOST}:${PORT}`);
});

//unhandle promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down The Server Due To Unhandle Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});