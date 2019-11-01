var service = require('../../services');
var orderController = {};
orderController.GetOrders = GetOrders;
orderController.CreateOrder = CreateOrder;
orderController.UpdateOrder = UpdateOrder;
orderController.DeleteOrder = DeleteOrder;
orderController.GetOpenOrders = GetOpenOrders;
orderController.RejectOrder = RejectOrder;
module.exports = orderController;


function GetOrders(req, res) {
    if (req.query.id) {
        GetOrderById(req, res);
    } else if (req.query.farmerId) {
        GetOrderByFarmer(req, res);
    } else {
        service.order_service.GetOrders().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }
}
function GetOrderById(req, res) {
    service.order_service.GetOrderById(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetOrderByFarmer(req, res) {
    service.order_service.GetOrderByFarmer(req.query.farmerId).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}


function CreateOrder(req, res) {
    service.order_service.CreateOrder(req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
};

function UpdateOrder(req, res) {
    service.order_service.UpdateOrder(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
}

function DeleteOrder(req, res) {
    service.order_service.DeletOrder(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function GetOpenOrders(req, res) {
    service.order_service.GetOpenOrders().then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function RejectOrder(req, res) {
    service.order_service.UpdateOrder(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
};

