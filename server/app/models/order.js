'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    inventoryId: { type: String, required: true },
    inventoryName: { type: String, required: true },
    quantity: { type: Number, required: true },
    approvedQuantity: { type: Number },
    approvedPrice: { type: Number },
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' },
    farmerId: { type: String, required: true },
    farmerName: { type: String, required: true },
    orderdById: { type: String, required: true },
    orderdByName: { type: String, required: true },
    fulfilDate: { type: Date },
    comments: [{ body: String, date: Date }],
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Order', Order);

