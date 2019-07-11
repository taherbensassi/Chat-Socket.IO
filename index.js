var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect',()=>{
        console.log('a user disconnected');

    })

    socket.on('Created',(data)=>{
        socket.broadcast.emit('Created', (data))
    })

    socket.on('chat-message',(data)=>{
        socket.broadcast.emit('chat-message', (data))
    })

    socket.on('typing',(data)=>{
        socket.broadcast.emit('typing', (data))
    })


    socket.on('stopTyping',(data)=>{
        socket.broadcast.emit('stopTyping', (data))
    })

});

http.listen(3000, function(){
    console.log('listening on *:3000');
});