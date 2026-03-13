import express from 'express'
import 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'
import {connectdb} from  './config/config.js'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import path from 'path'


const app = express()     


app.use(express.json())

const __dirname = path.resolve()
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



if(process.env.NODE_ENV == "production")
{
    app.use(express.static(path.join(__dirname,"../client/dist")))

 app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
});
}

server.listen(process.env.PORT,()=>{
console.log('server is running on http://localhost:3000');
connectdb()

})
