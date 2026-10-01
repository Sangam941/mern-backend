import { UserModel } from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateToken } from "../utils/tokenGenerate.js"

// resgister controller
export const Register = async (req,res)=>{
    try {
        // req.body = email,username,password
        const {email, username, password, role} = req.body

        // check wether the user alredy exist in db or not
        const ExistedUser = await UserModel.findOne({email})

        // if exist return error-> user already register
        if(ExistedUser){
            return res.status(409).json({message:"User already exist"})
        }

        // hashed the password -> to prevent from unauthorized person
        // bcryptjs
        const hasedPassword = await bcrypt.hash(password, 10)

        // if not exist -> let the user be registerd
        const user = await UserModel.create({
            username,
            email,
            password:hasedPassword, 
            role
        })

        return res.status(201).json({message:"User register successfully..."})

    } catch (error) {
        res.status(500).json({message:"Server Error:: " + error.message})
    }
}


// login controller

export const login = async (req,res)=>{
    try {
        // req.body = email, password
        const {email, password} = req.body

        // check wether the use already exist or not
        const user = await UserModel.findOne({email})
        console.log(user)
        // if not exist in db send to the regoister page/ register first
        if(!user){
            return res.status(400).json({message:"email or password is incorrect"})
        }
        // if already exist-> login process
        // compare the user password with db password

        const isMatchPassword = await bcrypt.compare(password, user.password)

        if(!isMatchPassword){
            return res.status(400).json({message:"email or password is incorrect"})
        }

        const payload={
            id:user._id,
            role:user.role
        }

        // token generate
        const token = generateToken(payload)

        // set the token into cookies
        res.cookie("token", token)
    
        console.log(token)

        return res.status(200).json({message:"user loggin successfully",user, token})

        // login successful
        
    } catch (error) {
        res.status(500).json({message:"Server Error:: " + error.message})
    }
}