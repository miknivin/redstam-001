import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [ true, "Please enter product name"],
        maxLength: [200, "Product name cannot Exceeds 200 charcters"]
    },
    price:{
        type:Number,
        required: [ true, "Please enter product name"],
    },
    description:{
        type: String,
        required: [ true, "Please enter product name"],
        maxLength: [1000, "Description name cannot Exceeds 1000 charcters"]
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
            "Soaps",
            "Tea",
            "Wellbeing"
          ],
          message: "Please select correct category",
        },
    },
    seller:{
        type: String,
        required:[false]
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
}, {timestamps:true})

const products = mongoose.model('Product',productSchema)

export default products
