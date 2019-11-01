'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Sales = new Schema({
    orderId: { type: String, required: true, unique: true },
    inventoryId: { type: String, required: true },
    inventoryName: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    price: { type: Number, required: true },
    comments: [{ body: String, date: Date }],
    status: { type: String, default: 'pending' },
    farmerId: { type: String, required: true },
    farmerName: { type: String, required: true },
    fulfilledById: { type: String, required: true },
    fulfilledByName: { type: String, required: true }
});

module.exports = mongoose.model('Sales', Sales);
