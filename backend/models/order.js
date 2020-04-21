const mongoose = require('mongoose');

let Order = new mongoose.Schema({
    productname: {
        type: String
    },
    productid:
    {
        type: String
    },
    quantity: {
        type: Number
    },
    seller: {
        type: String
    },
    buyername: {
        type: String
    },
    status: {
        type: String
    },
    price: {
        type: Number
    },
    quantity_remaining: {
        type: Number
    }
    },
    {collection: 'Order'}

);

module.exports = mongoose.model('Order', Order);