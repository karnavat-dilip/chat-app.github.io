import express from 'express'
import http from 'http'
import path from 'path'
import { Server } from 'socket.io'
const app =express()
const server =http.createServer(app)
const io = new Server(server)

const PORT=process.env.PORT||3000
const __dirname =path.resolve()

app.use(express.static(__dirname))

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('msg',(msg)=>{
        socket.broadcast.emit('msg',msg)
    })
  });

app.get('/',(req,res)=>{
    res.sendFile(__dirname + "/index.html")
    console.log(__dirname);
})

server.listen(PORT,()=>{
    console.log(`server is lisning on port ${PORT}`);
})