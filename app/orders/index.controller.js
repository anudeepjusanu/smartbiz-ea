(function () {
    'use strict';

    angular
        .module('app')
        .controller('Orders.IndexController', Controller)
        .controller('Orders.searchFarmer', searchFarmer)
        .controller('Orders.addController', addController)

    function Controller(OrderService, noty) {
        var vm = this;
        vm.orders = [];
        vm.deleteOrder = deleteOrder;

        function getOrders() {
            OrderService.getAllOrders().then(function (data) {
                vm.orders = data;
            }, function (error) {
                console.log(error);
            })
        };

        function deleteOrder(id) {
            OrderService.deleteOrder(id).then(function (data) {
                if (data) {
                    noty.showSuccess("Inactive Success");
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

    function searchFarmer(UserService, noty) {
        var vm = this;
        vm.farmer = {};
        vm.search = {};
        vm.getFarmer = getFarmer;
        vm.show = false;
        function getFarmer(form) {
            if (form.$valid) {
                UserService.getUserbyMobile(vm.search.mobile).then(data => {
                    if (data && data.role == 'FARMER') {
                        vm.farmer = data;
                        vm.show = true;
                    } else {
                        vm.show = false;
                        noty.showError("Farmer not found with mobile number");
                    }

                }, error => {

                })
            }

        };

        function init() {

        }
        init();
    }

    function addController(OrderService, noty, $state, InventoryService, UserService) {
        var vm = this;
        vm.order = {};
        vm.getOrder = getOrder;
        vm.saveOrder = saveOrder;
        vm.inventories = [];
        vm.farmer = {};
        vm.isNew = true;

        function getInventories() {
            InventoryService.getAllInventory().then(function (data) {
                vm.inventories = data;
                getFarmer($state.params.farmerId);
            }, function (error) {
                console.log(error);
            })
        };

        function getFarmer(id) {
            UserService.getUserById(id).then(data => {
                if (data && data.role == 'FARMER') {
                    vm.order.farmerId = data._id;
                    vm.order.farmerName = data.firstName + " " + data.lastName;
                    if ($state.params.id) {
                        getOrder($state.params.id);
                    }
                } else {
                    noty.showError("Farmer Id is not valid")
                }

            }, error => {

            })
        };

        function getOrder(id) {
            OrderService.getOrderById(id).then(function (data) {
                vm.order.name = data.name;
                vm.order.quantity = data.quantity;
                vm.order.inventoryId = data.inventoryId;
            }, function (error) {
                //FlashService.Error("Error");
            })
        };
        function saveOrder(form) {
            if (form.$valid) {
                for (var i = 0, len = vm.inventories.length; i < len; i++) {
                    if (vm.order.inventoryId == vm.inventories[i]._id) {
                        vm.order.inventoryName = vm.inventories[i].name;
                        break;
                    }
                }
                if (vm.isNew) {
                    OrderService.createOrder(vm.order).then(function (data) {
                        noty.showSuccess("Order Added");
                        $state.go('orders')
                    }, function (error) {
                        //FlashService.Error("Error");
                    });
                } else {
                    vm.order.active = true;
                    OrderService.updateOrder($state.params.id, vm.order).then(function (data) {
                        if (data) {
                            noty.showSuccess("Order Updated");
                            $state.go('orders')
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
            UserService.GetCurrent().then(function (user) {
                vm.order.orderdById = user._id;
                vm.order.orderdByName = user.firstName + " " + user.lastName;
                if ($state && $state.params && $state.params.farmerId) {
                    getInventories();
                    if ($state.params.id) {
                        vm.isNew = false;
                    } else {
                        vm.isNew = true;
                    }
                } else {
                    $state.go('orders');
                }
            });

        }
        init();
    }

})();