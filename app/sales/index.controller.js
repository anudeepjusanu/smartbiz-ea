(function () {
    'use strict';

    angular
        .module('app')
        .controller('Sales.IndexController', Controller)
        .controller('Sales.addController', addController)
        .controller('Sales.openOrders', openOrders)
        .controller('Sales.fulFillController', fulFillController)

    function Controller(SalesService, noty) {
        var vm = this;
        vm.sales = [];
        vm.completeOrder = completeOrder;

        function getSales() {
            SalesService.getAllSales().then(function (data) {
                vm.sales = data;
            }, function (error) {
                console.log(error);
            })
        };

        function completeOrder(id) {
            var sale = {
                'status': 'completed'
            }
            SalesService.updateSale(id, sale).then(function (data) {
                if (data) {
                    noty.showSuccess("Inactive Success");
                    getSales();
                }
            }, function (error) {
                console.log(error);
            })
        }

        var init = function () {
            getSales();
        };
        init();
    }

    function addController(SalesService, noty, $state) {
        var vm = this;
        vm.sale = {};
        vm.getSale = getSale;
        vm.createSale = createSale;
        vm.isNew = true;

        function getSale(id) {
            SalesService.getSaleById(id).then(function (data) {
                vm.sale = {
                    "name": data.name,
                    "quantity": data.quantity
                };
            }, function (error) {
                //FlashService.Error("Error");
            })
        };
        function createSale(form) {
            if (form.$valid) {
                if (vm.isNew) {
                    SalesService.createSale(vm.sale).then(function (data) {
                        noty.showSuccess("Sale Added");
                        $state.go('sales')
                    }, function (error) {
                        //FlashService.Error("Error");
                    });
                } else {
                    vm.sale.active = true;
                    SalesService.updateSale($state.params.id, vm.sale).then(function (data) {
                        if (data) {
                            noty.showSuccess("Sale Updated");
                            $state.go('sales')
                        } else {
                            noty.showError("Something went wrong");
                        }

                    }, function (error) {
                        //FlashService.Error("Error");
                    });
                }

            } else {
                noty.showSuccess("Please enter all fields");
            }
        }

        function init() {
            if ($state && $state.params && $state.params.id) {
                vm.isNew = false;
                getSale($state.params.id);
            } else {
                vm.isNew = true;
            }
        }
        init();
    }
    function openOrders(OrderService, noty, $uibModal) {
        var vm = this;
        vm.orders = [];
        vm.rejectOrder = rejectOrder;
        vm.fulfill = fulfill;

        function getOrders() {
            OrderService.getOpenOrders().then(function (data) {
                vm.orders = data;
            }, function (error) {
                console.log(error);
            })
        };

        function fulfill(order) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'sales/fulfillModal.html',
                controller: 'Sales.fulFillController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    order: function () {
                        return order;
                    }
                }
            });

            modalInstance.result.then(function (userObj) {
                getOrders();
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        function rejectOrder(id) {
            var order = {
                "status": 'rejected',
                "comments": [{
                    "body": "Rejected by User"
                }]
            }
            OrderService.rejectOrder(id, order).then(function (data) {
                if (data) {
                    noty.showSuccess("Order Reject Success");
                    getOrders();
                }
            }, function (error) {
                console.log(error);
            })
        }

        var init = function () {
            getOrders();
        };
        init();
    }

    function fulFillController($uibModalInstance, InventoryService, noty, order, UserService, SalesService) {
        var vm = this;
        vm.saleObj = order;
        vm.addSale = addSale;
        vm.cancel = cancel;

        function getInventory(id) {
            InventoryService.getInventoryById(id).then(function (data) {
                vm.saleObj.availableQuantity = data.quantity;
            }, function (error) {
                //FlashService.Error("Error");
            })
        }

        function addSale(form) {
            if (form.$valid) {
                if (vm.saleObj.approvedQuantity > vm.saleObj.availableQuantity) {
                    noty.showError("Available Quantity is less in the inventory");
                } else {
                    var obj = {
                        "inventoryId": order.inventoryId,
                        "inventoryName": order.inventoryName,
                        "orderId": order._id,
                        "quantity": vm.saleObj.approvedQuantity,
                        "price": vm.saleObj.price,
                        "farmerId": order.farmerId,
                        "farmerName": order.farmerName,
                        "fulfilledById": vm.saleObj.fulfilledById,
                        "fulfilledByName": vm.saleObj.fulfilledByName,
                        "comments": [{
                            "body": vm.saleObj.comments
                        }]
                    }
                    SalesService.createSale(obj).then(function (data) {
                        noty.showSuccess("Fulfilled successfully!");
                        $uibModalInstance.close();
                    }, function (error) {

                    })
                }

            }
        }
        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        function init() {
            UserService.GetCurrent().then(function (user) {
                vm.saleObj.fulfilledById = user._id;
                vm.saleObj.fulfilledByName = user.firstName + " " + user.lastName;
                getInventory(order.inventoryId)
            });
        }
        init();
    }

})();