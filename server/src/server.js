import express from 'express'
import 'dotenv/config'
import { Server } from 'socket.io'
import http from 'http'
import { connectdb } from './config/config.js'
import authRoute from './routes/auth.route.js'
import messageRoute from './routes/message.route.js'
import { arcjetProtection } from './middleware/Arject.middleware.js'
import path from 'path'
import cookieparser from 'cookie-parser'
import cors from 'cors'

import {app,server,io} from './libs/socket.js'



app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieparser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(arcjetProtection)

const __dirname = path.resolve()


app.get('/health', (req, res) => {
    res.status(200).json({ message: "Server is healthy" })
})
app.use('/api/auth', authRoute)
app.use('/api/messages', messageRoute)





if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")))

    app.use((req, res) => {
        res.sendFile(path.resolve(__dirname, "../../client/dist/index.html"));
    });
}

server.listen(process.env.PORT, () => {
    console.log('server is running on http://localhost:3000');
    connectdb()

})
