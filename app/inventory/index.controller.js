(function () {
    'use strict';

    angular
        .module('app')
        .controller('Inventory.IndexController', Controller)
        .controller('Inventory.addController', addController)

    function Controller(InventoryService, noty) {
        var vm = this;
        vm.inventories = [];
        vm.deleteInventory = deleteInventory;

        function getInventories() {
            InventoryService.getAllInventory().then(function (data) {
                vm.inventories = data;
            }, function (error) {
                console.log(error);
            })
        };

        function deleteInventory(id) {
            InventoryService.deleteInventory(id).then(function (data) {
                if (data) {
                    noty.showSuccess("Inactive Success");
                    getInventories();
                }
            }, function (error) {
                console.log(error);
            })
        }

        var init = function () {
            getInventories();
        };
        init();
    }

    function addController(InventoryService, noty, $state) {
        var vm = this;
        vm.inventory = {};
        vm.getInventory = getInventory;
        vm.saveInventory = saveInventory;
        vm.isNew = true;

        function getInventory(id) {
            InventoryService.getInventoryById(id).then(function (data) {
                vm.inventory = {
                    "name": data.name,
                    "quantity": data.quantity
                };
            }, function (error) {
                //FlashService.Error("Error");
            })
        };
        function saveInventory(form) {
            if (form.$valid) {
                if (vm.isNew) {
                    InventoryService.createInventory(vm.inventory).then(function (data) {
                        noty.showSuccess("Inventory Added");
                        $state.go('inventory')
                    }, function (error) {
                        //FlashService.Error("Error");
                    });
                } else {
                    vm.inventory.active = true;
                    InventoryService.updateInventory($state.params.id, vm.inventory).then(function (data) {
                        if (data) {
                            noty.showSuccess("Inventory Updated");
                            $state.go('inventory')
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
                getInventory($state.params.id);
            } else {
                vm.isNew = true;
            }
        }
        init();
    }

})();