(function () {
    'use strict';

    angular
        .module('app')
        .factory('OrderService', Service);

    function Service($http, $q) {
        var service = {};
        var orderUrl = '/api/v1/order';
        service.getAllOrders = getAllOrders;
        service.getOpenOrders = getOpenOrders;
        service.getOrderById = getOrderById;
        service.createOrder = createOrder;
        service.updateOrder = updateOrder;
        service.deleteOrder = deleteOrder;
        service.rejectOrder = rejectOrder;
        service.getOrderByFarmer = getOrderByFarmer;

        return service;

        function getAllOrders() {
            return $http.get(orderUrl).then(handleSuccess, handleError);
        }
        function getOpenOrders() {
            return $http.get(orderUrl + '/openOrders').then(handleSuccess, handleError);
        }

        function getOrderById(id) {
            return $http.get(orderUrl + '?id=' + id).then(handleSuccess, handleError);
        }

        function createOrder(order) {
            return $http.post(orderUrl, order).then(handleSuccess, handleError);
        }

        function updateOrder(id, order) {
            return $http.put(orderUrl + '?id=' + id, order).then(handleSuccess, handleError);
        }

        function deleteOrder(id) {
            return $http.delete(orderUrl + '?id=' + id).then(handleSuccess, handleError);
        }
        function rejectOrder(id, order) {
            return $http.post(orderUrl + '/reject/?id=' + id, order).then(handleSuccess, handleError);
        }

        function getOrderByFarmer(farmerId) {
            return $http.get(orderUrl + '?farmerId=' + farmerId).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();