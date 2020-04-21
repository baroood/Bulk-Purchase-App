const mongoose = require('mongoose');

let Product = new mongoose.Schema({
    productname: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    vendor_email: {
        type: String
    },
    status_pro: {
        type: String
    }
    },
    {collection: 'Product'}

);

module.exports = mongoose.model('Product', Product);