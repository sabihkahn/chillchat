import express from  'express'
import { logincontroller, logout, signup } from '../controller/auth.controller.js'

const router = express.Router()


router.post('/signup',signup)
router.post('/login',logincontroller)
router.post('/logout',logout)

export default router