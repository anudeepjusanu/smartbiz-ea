'use strict';
var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Users = new Schema({
    mobile: { type: Number, required: true, unique: true },
    hash: { type: String, required: true },
    email: { type: String, unique: true },
    aadhar: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    memberShipEnd: { type: Date },
    active: { type: Boolean, default: true },
    amountUtilized: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pinCode: { type: Number },
    role: { type: String, required: true },
    landInAcres: { type: Number },
    executiveId: { type: String },
    executiveName: { type: String }
});

module.exports = mongoose.model('Users', Users);
