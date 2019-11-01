(function () {
    'use strict';

    angular
        .module('app')
        .factory('InventoryService', Service);

    function Service($http, $q) {
        var service = {};
        var inventoryUrl = '/api/v1/inventory';
        service.getAllInventory = getAllInventory;
        service.getInventoryById = getInventoryById;
        service.createInventory = createInventory;
        service.updateInventory = updateInventory;
        service.deleteInventory = deleteInventory;

        return service;

        function getAllInventory() {
            return $http.get(inventoryUrl).then(handleSuccess, handleError);
        }

        function getInventoryById(id) {
            return $http.get(inventoryUrl + '?id=' + id).then(handleSuccess, handleError);
        }

        function createInventory(inventory) {
            return $http.post(inventoryUrl, inventory).then(handleSuccess, handleError);
        }

        function updateInventory(id, inventory) {
            return $http.put(inventoryUrl + '?id=' + id, inventory).then(handleSuccess, handleError);
        }

        function deleteInventory(id) {
            return $http.delete(inventoryUrl + '?id=' + id).then(handleSuccess, handleError);
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