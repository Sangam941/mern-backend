import mongoose from "mongoose";


// create user schema
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','customer']
    }
},{timestamps:true})


// create user model
export const UserModel = mongoose.model("User", UserSchema)