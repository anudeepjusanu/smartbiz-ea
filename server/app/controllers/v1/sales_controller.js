var service = require('../../services');
var salesController = {};
salesController.GetSales = GetSales;
salesController.CreateSale = CreateSale;
salesController.UpdateSales = UpdateSales;
salesController.DeleteSale = DeleteSale;
module.exports = salesController;


function GetSales(req, res) {
    if (req.query.id) {
        GetSalesById(req, res);
    } else {
        service.sales_service.GetSales().then(result => {
            res.json(result);
        }, error => {
            res.json(error);
        });
    }

}
function GetSalesById(req, res) {
    service.sales_service.GetSalesById(req.query.id).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
}

function CreateSale(req, res) {
    // var form = {
    //     "inventoryId": "5db1a3e54a2de3373264ad3e",
    //     "inventoryName": "Pesticide",
    //     "orderId": "5db2867c61fcad424504af34",
    //     "quantity": 1,
    //     "price": "100",
    //     "farmerId": "5db1a3e54a2de3373264hjfg",
    //     "farmerName": "Anudeep",
    //     "fulfilledById": "5db1a3e54a2de3373264hjfg",
    //     "fulfilledByName": "Deep"
    // }
    service.sales_service.CreateSale(req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    });
};

function UpdateSales(req, res) {
    service.sales_service.UpdateSale(req.query.id, req.body).then(result => {
        res.json(result);
    }, error => {
        res.json(error);
    })
}

function DeleteSale(req, res) {
    res.json({
        "error": "Not Available"
    });
    // service.sales_service.DeleteSale(req.params.id).then(result => {
    //     res.json(result);
    // }, error => {
    //     res.json(error);
    // });
}

