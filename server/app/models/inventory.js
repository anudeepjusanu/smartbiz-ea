'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Inventory = new Schema({
    name: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model('Inventory', Inventory);
