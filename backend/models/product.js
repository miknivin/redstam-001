import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "Please enter product name"],
        maxLength: [200, "Product name cannot exceed 200 characters"]
    },
    price:{
        type:Number,
        required: [ true, "Please enter product price"],
    },
    shortDescription:{
        type: String,
        required: [ true, "Please enter short product description"],
        maxLength: [500, "Short description cannot exceed 500 characters"]
    },
    longDescription:{
        type: String,
        required: [ true, "Please enter long product description"],
        maxLength: [2500, "Long description cannot exceed 1200 characters"]
    },
    ratings:{
        type: Number,
        default:4
    },
    images: [
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
    category: {
        type: String,
        required: [true, "Please enter product category"],
        enum: {
          values: [
            "For Men",
            "For Women",
            "Wellbeing"
          ],
          message: "Please select correct category",
        },
    },
    seller:{
        type: String,
        required:false
    },
    stock:{
        type:Number,
        required: [true,"Please enter product stock"]
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,
            },
            ratings:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            },
        }
    ],
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false
    },
}, {timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;
