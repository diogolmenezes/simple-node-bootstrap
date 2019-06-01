const { database } = require('simple-node-framework').Singleton;
const mongoose = require('mongoose');

// on database.connections.mongodb.application, application is the conection name. to use another connection change this name
const connection = database.connections.mongodb ? database.connections.mongodb.application : mongoose || mongoose;

const schema = mongoose.Schema({
    nome: String,
}, {
    collection: 'customers'
});

module.exports = connection.model('Customer', schema);
