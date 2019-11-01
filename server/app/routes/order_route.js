var express = require('express');
const router = express.Router();
var orderController = require('../controllers/v1/order_controller');

router.route('/')
    .post(orderController.CreateOrder);
router.route('/reject')
    .post(orderController.RejectOrder);
router.route('/')
    .get(orderController.GetOrders);
router.route('/openOrders')
    .get(orderController.GetOpenOrders);
router.route('/')
    .put(orderController.UpdateOrder);
router.route('/')
    .delete(orderController.DeleteOrder);
module.exports = router;

