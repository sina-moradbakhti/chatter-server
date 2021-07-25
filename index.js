const socket_user_model = require('./models/socketUser.ts')
const socket_p2p_data_model = require('./models/p2pSocketData.ts')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const PORT = process.env.PORT || 6161;
var connected_socket_users = [];

app.get('/', (req, res) => {
    res.send("Node Server is running. Yay!! ")
})

io.on('connection', socket => {
    //Get the chatID of the user and join in a room of the same chatID

    /* Join User */
    const client_id = socket.conn.id;
    console.log(`User (${client_id}) connected.`);
    var find = connected_socket_users.findIndex(item => item.client_id === client_id);
    if (find === -1) {
        connected_socket_users.push(new socket_user_model.SocketUserObject(socket.handshake, client_id));
        console.log("SOCKETS ====> ", connected_socket_users);
    }
    chatID = socket.handshake.query.chatID;
    socket.join(chatID);
    /* Join User */

    /* Left User */
    socket.on('disconnect', () => {
        socket.leave(chatID);
        const client_id = socket.conn.id;

        var find = connected_socket_users.findIndex(item => item.client_id === client_id);
        if (find !== -1) {
            connected_socket_users.splice(find, 1);
            console.log("SOCKETS ====> ", connected_socket_users);
        }

        console.log(`User (${client_id}) disconnected.`);
    });
    /* Left User */

    /* Get All Clients */
    socket.on('/clients/get/all', function(data) {
        chatID = socket.handshake.query.chatID;
        io.to(chatID).emit('clients_get_all', JSON.stringify(connected_socket_users));
    });
    /* Get All Clients */

    /* Send Point to point message */
    socket.on('/send_p2p_message', function(data) {
        let p2pMessage = new socket_p2p_data_model.P2pSocketData(data);
        socket.to(p2pMessage.socket_id_to).emit('p2p_message', p2pMessage.socket_id_from, p2pMessage.toJson());
    });
    /* Send Point to point message */

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

// Start listening web socket
http.listen(PORT)
console.log(`Server is listening on port ${PORT}`);