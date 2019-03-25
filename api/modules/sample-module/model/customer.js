const { database } = require('simple-node-framework');
const mongoose = require('mongoose');

// on database.connections.application, application is the conection name. to use another connection change this name
const connection = database.connections.application || mongoose;

const schema = mongoose.Schema({
    nome: String,
}, {
    collection: 'customers'
});

module.exports = connection.model('Customer', schema);
