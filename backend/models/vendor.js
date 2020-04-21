const mongoose = require('mongoose');

let Vendor = new mongoose.Schema({
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
    {collection: 'Vendor'}

);

module.exports = mongoose.model('Vendor', Vendor);