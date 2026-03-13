import express from 'express'
import 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'
import {connectdb} from  './config/config.js'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'

const app = express()     
connectdb()

app.use(express.json())


// Routes

app.use('/auth',authRoute)
app.use('/api/message',messageRoute)

const server = http.createServer(app)
const io = new Server(server,{ 
    cors:"*" 
})

io.on('connection',(socket)=>{
    socket.emit('hello')
})

app.get('/',(req,res)=>{res.send("hello")})


server.listen(process.env.PORT,()=>{console.log('server is running on http://localhost:3000');
})
