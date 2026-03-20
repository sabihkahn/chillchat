import jwt from 'jsonwebtoken'
import User from '../model/User.js'

export const socketAuthMiddleware = async(socket,next) =>{
try {
    const token = socket.handshake.headers.cookie
    ?.split("; ")
    ?.find((r)=>{
    return r.startsWith("jwt=")
    })
    ?.split("=")[1]

    if(!token){
        return next(new Error("Unauthorized -No token provided"))
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(!decode){
        console.log("Socket connection rejected: Invalid Token")
        return next(new Error("Unauthorized  token provided"))
    }
    const user = await User.findById(decode.userId).select("-password")
    if(!user){
        console.log("Socekt connection rejected")
        return next(new Error("User not found"))
    }

   socket.user = user
   socket.userId = user._id.toString()
   next()

} catch (error) {
    console.log("Error in socketAuthmiddleware ");
    
}

}