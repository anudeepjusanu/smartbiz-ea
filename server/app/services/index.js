const inventory_service = require('./inventory_service');
const order_service = require('./order_service');
const sales_service = require('./sales_service');
const user_service = require('./users_service');
module.exports = {
    inventory_service: inventory_service,
    order_service: order_service,
    sales_service: sales_service,
    user_service: user_service
}