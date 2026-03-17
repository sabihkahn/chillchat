import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
import {socketAuthMiddleware} from '../middleware/socket.auth.middleware.js'

const app = express()

const server = http.createServer(app)


const io = new Server(server,{
    cors:{
        origin: [process.env.CLIENT_URL],
        credentials:true
    }
})

io.use(socketAuthMiddleware)

export function getreciverId(userid){
    return userSocketmap[userid]
}

const userSocketmap = {}  // in this map we will have userid as key and socketid as value like this {userid:socketid}




io.on("connection",(socket)=>{
    const userId = socket.userId
    userSocketmap[userId] = socket.id
    console.log("a user connected  ", socket.user.fullName, "id  ", socket.user._id)
    io.emit("getOnlineUsers",Object.keys(userSocketmap))


    socket.on("disconnect",()=>{
        delete userSocketmap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketmap))
    })

    }
)

export {io,server,app}