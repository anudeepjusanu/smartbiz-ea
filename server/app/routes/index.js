var express = require('express');
var authenticate_routes = require('./authenticate_routes');
var inventory_routes = require('./inventory_routes');
var order_routes = require('./order_route');
var sales_route = require('./sales_route');
var user_route = require('./user_routes');
const Router = express.Router();

exports = module.exports = Router;

Router.use('/authenticate', authenticate_routes);
Router.use('/inventory', inventory_routes);
Router.use('/order', order_routes);
Router.use('/sales', sales_route);
Router.use('/user', user_route);