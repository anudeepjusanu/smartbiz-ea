var express = require('express');
const router = express.Router();
var salesController = require('../controllers/v1/sales_controller');

router.route('/')
    .post(salesController.CreateSale);
router.route('/')
    .get(salesController.GetSales);
router.route('/')
    .put(salesController.UpdateSales);
router.route('/')
    .delete(salesController.DeleteSale);
module.exports = router;

