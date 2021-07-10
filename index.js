const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const PORT = process.env.PORT || 6161;

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!! " + PORT)
})

io.on('connection', socket => {
    //Get the chatID of the user and join in a room of the same chatID
    console.log('A new user connected.', socket.handshake.headers);
    chatID = socket.handshake.query.chatID;
    socket.join(chatID);

    socket.on('/test', function(msg) {
        console.log(msg);
    });

    //Leave the room if the user closes the socket
    socket.on('disconnect', () => {
        socket.leave(chatID);
        console.log('user disconnected.');
    })

    //Send message to only a particular user
    socket.on('send_message', message => {
        receiverChatID = message.receiverChatID
        senderChatID = message.senderChatID
        content = message.content

        //Send message to only that particular room
        socket.in(receiverChatID).emit('receive_message', {
            'content': content,
            'senderChatID': senderChatID,
            'receiverChatID': receiverChatID,
        })
    })
});

http.listen(PORT)
console.log(`Server is listening on port ${PORT}`);