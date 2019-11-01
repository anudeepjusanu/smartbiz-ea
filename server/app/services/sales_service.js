
var model = require('../models');
var _ = require('underscore');
var service = {};
service.GetSales = GetSales;
service.GetSaleById = GetSaleById;
service.CreateSale = CreateSale;
service.UpdateSale = UpdateSale;
service.DeleteSale = DeleteSale;
module.exports = service;


function GetSales() {
    return new Promise((resolve, reject) => {
        model.Sales.find((err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function GetSaleById(id) {
    return new Promise((resolve, reject) => {
        model.Sales.find({ _id: id }, (err, docs) => {
            err ? reject(err) : resolve(docs);
        });
    });
}

function CreateSale(sale) {
    return new Promise((resolve, reject) => {
        model.Inventory.findById(sale.inventoryId, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                if (doc.quantity >= sale.quantity) {
                    model.Sales.create(sale, function (err, info) {
                        if (err) {
                            reject(err)
                        } else {
                            doc.quantity = doc.quantity - sale.quantity;
                            model.Inventory.findOneAndUpdate({ _id: sale.inventoryId }, { $set: doc }, { new: true }, (err, inv) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    model.Order.findOneAndUpdate({ _id: sale.orderId }, { $set: { 'approvedQuantity': sale.quantity, 'approvedPrice': sale.price, 'status': 'completed' } }, { new: true }, (err, doc) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            model.Users.findById(sale.farmerId, (err, user) => {
                                                if (err) {
                                                    reject(err)
                                                } else {
                                                    if (user.amountUtilized) {
                                                        user.amountUtilized += sale.price;
                                                    } else {
                                                        user.amountUtilized = sale.price;
                                                    }
                                                    model.Users.findOneAndUpdate({ _id: sale.farmerId }, { $set: user }, { new: true }, (err, doc) => {
                                                        err ? reject(err) : resolve({
                                                            "message": "Sale Created Successfully"
                                                        });
                                                    });
                                                }
                                            });

                                        }

                                    });
                                }

                            });
                        }
                    });
                } else {
                    reject({
                        "error": "Inventory items are less to create a sale"
                    });
                }
            }
        });

    })
}

function UpdateSale(id, sale) {
    return new Promise((resolve, reject) => {
        model.Sales.findOneAndUpdate({ _id: id }, { $set: sale }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    })
}

function DeleteSale(id) {
    return new Promise((resolve, reject) => {
        model.Sales.findOneAndUpdate({ _id: id }, { $set: { "active": false } }, { new: true }, (err, doc) => {
            err ? reject(err) : resolve(doc);
        });
    });
}




