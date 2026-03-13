import mongoose from "mongoose";

export const connectdb = () =>{
    try {
        mongoose.connect(process.env.Moongose_URI).then((res)=>{
            console.log('db connected successfully');
            
        }).catch((err)=>{
            console.log('error',err);
            
        })
    
    } catch (error) {
        console.log("error occur while connecting to db");
        
    }
}