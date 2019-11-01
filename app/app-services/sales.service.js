(function () {
    'use strict';

    angular
        .module('app')
        .factory('SalesService', Service);

    function Service($http, $q) {
        var service = {};
        var salesUrl = '/api/v1/sales';
        service.getAllSales = getAllSales;
        service.getSaleById = getSaleById;
        service.createSale = createSale;
        service.updateSale = updateSale;
        service.deleteSale = deleteSale;

        return service;

        function getAllSales() {
            return $http.get(salesUrl).then(handleSuccess, handleError);
        }

        function getSaleById(id) {
            return $http.get(salesUrl + '?id=' + id).then(handleSuccess, handleError);
        }

        function createSale(sale) {
            return $http.post(salesUrl, sale).then(handleSuccess, handleError);
        }

        function updateSale(id, sale) {
            return $http.put(salesUrl + '?id=' + id, sale).then(handleSuccess, handleError);
        }

        function deleteSale(id) {
            return $http.delete(salesUrl + '?id=' + id).then(handleSuccess, handleError);
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