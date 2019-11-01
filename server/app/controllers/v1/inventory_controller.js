var service = require('../../services');
var inventoryController = {};
inventoryController.GetInventory = GetInventory;
inventoryController.GetInventoryById = GetInventoryById;
inventoryController.CreateInventory = CreateInventory;
inventoryController.UpdateInventory = UpdateInventory;
inventoryController.DeleteInventory = DeleteInventory;
module.exports = inventoryController;


function GetInventory(req, res) {
    if (req.query.id) {
        GetInventoryById(req, res);
    } else {
        service.inventory_service.GetInventory().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }

}
function GetInventoryById(req, res) {
    service.inventory_service.GetInventorybyId(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function CreateInventory(req, res) {
    service.inventory_service.CreateInventory(req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
};

function UpdateInventory(req, res) {
    service.inventory_service.UpdateInventory(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
}

function DeleteInventory(req, res) {
    service.inventory_service.DeleteInventory(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

