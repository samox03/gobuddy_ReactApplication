// test messenger backend...
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)


//BASED ON SOCKET.IO Tutorial....

io.on('connection', socket => {
  console.log('connection made successfully')
  socket.on('message', ({name, message}) => {
    console.log('Message received on server: ', {name, message})
    io.emit('message', {name, message})
  })
})

server.listen(4000, function(){
  console.log('listening on port 4000')
})
