import User from '../model/User.js'
import bcrypt from 'bcrypt'
import {generateToken} from '../libs/utils.js'
import { sendWelcomeEmail } from '../email/emailhandler.js'
import cloudinary from '../libs/cloudinary.js'


export const signup = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        if (!email || !fullname || !password) {
            return res.status(400).send({ message: "all fields are required" })
        }
        if (password.length < 6) {
            return res.status(400).send({ message: "password must be atleast 6 character long" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).send({ message: "user already existed" })
        }

        const hasedPassword = await bcrypt.hash(password, 6)

        const newUser = new User({
            fullName: fullname,
            email: email,
            password: hasedPassword
        })
        if (newUser) {
            await newUser.save()
            generateToken(newUser._id,res)
             try {
            await sendWelcomeEmail(newUser.email,newUser.fullName,process.env.frontend_url)
        } catch (error) {
            console.log("error while sending ",error)
        }
            return res.status(201).send({
                _id:newUser._id,
                fullname:newUser.fullName,
                email:newUser.email,
                profilepic:newUser.profilePic
            })
        } else {
            return res.status(400).send({ message: "invalid user data" })
        }
       

    } catch (error) {
        console.log("error in authcontroller while creating user ",error);
        res.status(400).send({message:"Internal server error"})

    }
}


export const logincontroller = async(req,res)=>{
const {email,password} = req.body
try {
if(!email || !password){
    return res.status(400).send({message:"all fields are required"})
}
    const user =await User.findOne({email})
    if(!user){
        return res.status(400).send({message:"Invalid cridentials"})
    }
    const ispasswordcorrect =  await bcrypt.compare(password,user.password)
    if(!ispasswordcorrect){
        return res.status(400).send({message:"Invalid cridentials"})
    }
     generateToken(user._id, res);
     return res.status(200).send({
                _id:user._id,
                fullname:user.fullName,
                email:user.email,
                profilepic:user.profilePic
            })

} catch (error) {
    console.log("error in login controller",error);
    res.status(400).send("Internal server error")
    
}
}


export const logout = (_,res)=>{
    res.cookie("jwt","",{maxAge:0})
    res.status(200).send({message:"logout success"})
}


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });

        const userId = req.user._id;

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};