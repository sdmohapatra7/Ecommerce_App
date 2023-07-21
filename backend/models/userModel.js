const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: [true,'Please Enter Your Name'],
        maxLength: [30, "Name Can't Ecxeed 30 Characters"],
        minLength: [4,"Name Should Have More Then 5 Character"]
    },

    email:{
        type: String,
        required: [true,"Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail,"Please Enter A valid Email"],
    },

    password: {
        type: String,
        required: [true,"Please Enter Your Password"],
        minLength: [8,"Password Should Have Gratter Then 5 Character"],
        select: false
    },

    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },

    role:{
        type: String,
        default:"user"
    },

    resetpasswordToken:String,

    resetpasswordExpire:Date,
});

userSchema.pre("save",async function(next){     
    //before save the password in the db first convert to hesh this is a event

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token create a function to get token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
}

//compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

module.exports = mongoose.model("User",userSchema);