const mongoose = require('mongoose');

const connectDataase = ()=>{
    mongoose.connect(process.env.URL)
    .then(()=>console.log('Mongodb is Up and Connected'));
    // .catch((err)=>console.log('Error While Connect To MongoDb',err)); 
    // because we handle promise rejection error globalily
}


module.exports = connectDataase;