const jwt=require("jsonwebtoken");

const authMiddleware = (req,res,next)=>{

    try{
        // Get token from header 
        const authHeader=req.headers.authorization;

        // chech token 
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                message: "Access denied. No token provided."
            });
        }

        // Extract token 
        const token=authHeader.split(" ")[1];

        // verify token 
        const decoded =jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // store user ID in request 
        req.user=decoded.id;

        // continue to next middleware or API
        next();
    } catch(error){
        return res.status(401).json({
            message:"Invalid or expired token"
        });
    }
};

module.exports=authMiddleware;