const mongoose = require("mongoose");

//Product Schema 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true, "Please enter product description"]
    },
    price:{
        type: Number,
        required: [true, "Please enter product price"],
        maxLength: [8, "Price cannot exceed 8 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    }],
    category:{
        type: String,
        required: [true, "Please select category for this product"]
    },
    stock:{
        type: Number,
        required: [true, "Please enter product stock"],
        maxLength: [4," stock cannot exceed 4 character"],
        default:1
    },
    numOfReviews: [
        {
            name:{
                type: String,
                required: true,
            },
            rating:{
                type: Number,
                required : true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    
    //
    user:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema);