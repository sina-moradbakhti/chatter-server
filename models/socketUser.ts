class SocketUserObject {
    client_id;
    fullName;
    uid;
    userId;
    systemToken;

    constructor(handshakeObject,cid) {
        this.fullName = handshakeObject.headers.fullname;
        this.systemToken = handshakeObject.headers.systemtoken;
        this.userId = handshakeObject.headers.userid;
        this.uid = handshakeObject.headers.uid;
        this.client_id = cid;
    }
}

module.exports = {SocketUserObject};