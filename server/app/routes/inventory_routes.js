var express = require('express');
const router = express.Router();
var inventoryController = require('../controllers/v1/inventory_controller');

router.route('/')
    .post(inventoryController.CreateInventory);
router.route('/')
    .get(inventoryController.GetInventory);
router.route('/')
    .put(inventoryController.UpdateInventory);
router.route('/')
    .delete(inventoryController.DeleteInventory);
module.exports = router;

