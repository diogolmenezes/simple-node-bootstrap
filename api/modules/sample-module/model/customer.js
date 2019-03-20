const { database } = require('simple-node-framework');
const mongoose     = require('mongoose');
const connection   = database.connections.application || mongoose;

const schema = mongoose.Schema({
    nome: String,
}, {
    collection: 'customers'
});

module.exports = connection.model('Customer', schema);
