import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();
// connect database with the server
export const db = async ()=>{
    try {
        if(!process.env.MONGODB_URL){
            throw new Error("mongo db url is not defined in the env")
        }
        
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connection successfully...")
    } catch (error) {
        console.log("ERROR in db connection: ", error.message)
        process.exit(1)
    }
}