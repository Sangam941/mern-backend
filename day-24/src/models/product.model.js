import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name:{
        type:String
    },
    desc:{
        type:String,
    },
    price:{
        type: Number,
    }
}, {timestamps:true})


// create product model
export const ProductModel = mongoose.model("Products", ProductSchema)
