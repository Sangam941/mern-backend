// auth middleware create
import jwt from 'jsonwebtoken'

export const authMiddleware = (req, res, next)=>{
    try {
        // get that tokens of the user
        const token = req.cookies.token
        console.log(token)

        if(!token){
            return res.status(401).json({message:"token not found"})
        }

        const data = jwt.verify(token, process.env.JWT_SECRET_KEY)


        req.user = data

        console.log(req.user.id)

        next()

    } catch (error) {
        return res.status(500).json({message:"token not found"})
    }
}