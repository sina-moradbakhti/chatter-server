const database = require('./config.js');
const table = '_users';

function insert() {
    database.connection.query("insert into `" + table + "` (`userId`, `tokenId`, `fullName`, `email`, `currentLoginStatus`) values ('1','11111','sina moradbakhti','sina_moradbakhti@yahoo.com','true')", function(err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
}

module.exports = {
    insert
};