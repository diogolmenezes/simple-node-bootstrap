const { database } = require('easy-framework');
const mongoose     = require('mongoose');
const connection   = database.connections.aplicacao || mongoose;

const schema = mongoose.Schema({
    nome: String,
}, {
    collection: 'clientes'
});

module.exports = connection.model('Cliente', schema);
