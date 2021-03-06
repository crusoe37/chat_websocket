const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = 3000

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

http.listen(port, () => {
    console.log('Listening on port:', port);
});

io.on('connection', (socket) => {

    socket.emit('connections', Object.keys(io.sockets.connected).length);

    socket.on('joined', (data) => {
        socket.broadcast.emit('joined', (data));
    });

    socket.on('leave', (data) => {
        socket.broadcast.emit('leave', (data));
    });
    
    socket.on('disconnect', () => {
        console.log("A user disconnected");
    });

    socket.on('chat-message', (data) => {
        socket.broadcast.emit('chat-message', (data));
    });
});