import express from  'express'
import { logincontroller, logout, signup, updateProfile } from '../controller/auth.controller.js'
import {arcjetProtection} from '../middleware/Arject.middleware.js'
import { authorization } from '../middleware/authorization.middleware.js'
const router = express.Router()


router.post('/signup',signup)
router.post('/login',logincontroller)
router.post('/logout',logout)
router.get('/get',authorization,async(req,res) =>{
    try {
        res.status(200).json({user:req.user})
    } catch (error) {
        console.log("error in get user",error);
        res.status(500).send({message:"Internal server error get user"})
    }
}
)


router.put('/update', authorization,updateProfile)
   

export default router