const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please Enter product description"]
    },
    price:{
        type:Number,
        required:[true,"Please Enter product price"],
        maxLength:[8,"price can't exceed 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"please Enter Product Category"]
    },
    gst: {   // GST field for Indian tax
        type: Number,
        // required: true,
        default: 18, // default 18% GST
        min: [0, "GST can't be negative"],
        max: [28, "GST can't exceed 28%"] // Max slab in India
    },
    hsn: {   // 👈 HSN Code for GST invoice
        type: String,
        // required: [true, "Please Enter HSN Code"],
        maxLength: [8, "HSN Code can't exceed 8 digits"],
        minLength: [4, "HSN Code must be at least 4 digits"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter Product Stock"],
        maxLength:[4,"Scock Can't exceed 4 character"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:'User',
                required: true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',productSchema);