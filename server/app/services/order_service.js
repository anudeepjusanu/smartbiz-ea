
var model = require('../models');
var _ = require('underscore');
var service = {};
service.GetOrders = GetOrders;
service.GetOpenOrders = GetOpenOrders;
service.GetOrderById = GetOrderById;
service.GetOrderByFarmer = GetOrderByFarmer;
service.CreateOrder = CreateOrder;
service.UpdateOrder = UpdateOrder;
service.DeletOrder = DeletOrder;
module.exports = service;


function GetOrders() {
    return new Promise((resolve, reject) => {
        model.Order.find((err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetOpenOrders() {
    return new Promise((resolve, reject) => {
        model.Order.find({ 'status': 'pending', 'isActive': true }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetOrderById(id) {
    return new Promise((resolve, reject) => {
        model.Order.findById(id, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetOrderByFarmer(farmerId) {
    return new Promise((resolve, reject) => {
        model.Order.find({ 'farmerId': farmerId }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function CreateOrder(order) {
    return new Promise((resolve, reject) => {
        model.Order.create(order, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function UpdateOrder(id, order) {
    return new Promise((resolve, reject) => {
        model.Order.findOneAndUpdate({ _id: id }, { $set: order }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function DeletOrder(id) {
    return new Promise((resolve, reject) => {
        model.Order.findOneAndUpdate({ _id: id }, { $set: { "isActive": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}


