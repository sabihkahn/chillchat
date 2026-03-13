import express from  'express'

const router = express.Router()


router.get('/login',(req,res)=>{
res.send("from auth route login")
})

export default router