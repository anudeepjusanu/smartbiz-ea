
var model = require('../models')
var service = {};
service.GetInventory = GetInventory;
service.GetInventorybyId = GetInventorybyId;
service.CreateInventory = CreateInventory;
service.UpdateInventory = UpdateInventory;
service.DeleteInventory = DeleteInventory;
module.exports = service;


function GetInventory() {
    return new Promise((resolve, reject) => {
        model.Inventory.find((err, docs) => {
            err ? reject(err) : resolve(docs);
        });

    });
}

function GetInventorybyId(inventoryId) {
    return new Promise((resolve, reject) => {
        model.Inventory.findById(inventoryId, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });

    });
}

function CreateInventory(inventory) {
    return new Promise((resolve, reject) => {
        model.Inventory.create(inventory, function (err, info) {
            err ? reject(err) : resolve(info);
        });
    })
}

function UpdateInventory(id, inventory) {
    return new Promise((resolve, reject) => {
        model.Inventory.findOneAndUpdate({ _id: id }, { $set: inventory }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}

function DeleteInventory(id) {
    return new Promise((resolve, reject) => {
        model.Inventory.findOneAndUpdate({ _id: id }, { $set: { "active": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}

