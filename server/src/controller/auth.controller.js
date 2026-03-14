import User from '../model/User.js'
import bcrypt from 'bcrypt'
import {generateToken} from '../libs/utils.js'
import { sendWelcomeEmail } from '../email/emailhandler.js'



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