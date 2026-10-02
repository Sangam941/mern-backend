// authorization check
export const adminMiddleware = (req, res, next)=>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(401).json({message:"only admin can access this page"})
        }

        next()

    } catch (error) {
        return res.status(500).json({message:"server error::: " + error.message})
    }
}