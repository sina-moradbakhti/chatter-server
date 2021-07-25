class P2pSocketData {
    socket_type;
    socket_message_type;
    socket_id_from;
    socket_id_to;
    socket_data;

    constructor(object) {
        this.socket_type = object.socket_type;
        this.socket_message_type = object.socket_message_type;
        this.socket_id_from = object.socket_id_from;
        this.socket_id_to = object.socket_id_to;
        this.socket_data = object.socket_data;
    }

    toJson() {
        return JSON.stringify(this);
    }
}

module.exports = { P2pSocketData };