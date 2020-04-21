const mongoose = require('mongoose');

let Customer = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    User_type: {
        type: String
    }
    },
    {collection: 'Customer'}

);

module.exports = mongoose.model('Customer', Customer);