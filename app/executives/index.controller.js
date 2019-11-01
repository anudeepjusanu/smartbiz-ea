(function () {
    'use strict';

    angular
        .module('app')
        .controller('Executives.IndexController', Controller)
        .controller('Executives.addController', addController)
        .controller('Executives.assignedFarmersController', assignedFarmersController)

    function Controller(UserService, noty, $uibModal) {
        var vm = this;
        vm.executives = [];
        vm.deleteExecutive = deleteExecutive;
        vm.viewFarmers = viewFarmers;
        function getAllExecutives() {
            UserService.getAllExecutives().then(function (data) {
                vm.executives = data;
            }, function (error) {
                console.log(error);
            });
        };

        function deleteExecutive(id) {
            UserService.deleteUser(id).then(function (data) {
                if (data) {
                    noty.showSuccess("Inactive Success");
                    getAllExecutives();
                }
            }, function (error) {
                console.log(error);
            })
        };

        function viewFarmers(executive) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'Executives/assignedFarmers.html',
                controller: 'Executives.assignedFarmersController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    executive: function () {
                        return executive;
                    }
                }
            });

            modalInstance.result.then(function (userObj) {

            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        var init = function () {
            getAllExecutives();
        };
        init();
    }

    function addController(UserService, noty, $state) {
        var vm = this;
        vm.user = {};
        vm.getUser = getUser;
        vm.addExecutive = addExecutive;
        vm.isNew = true;

        function getUser(id) {
            UserService.getUserById(id).then(function (data) {
                vm.user = {
                    "name": data.name,
                    "quantity": data.quantity
                };
            }, function (error) {
                //FlashService.Error("Error");
            })
        };
        function addExecutive(form) {
            if (form.$valid) {
                if (vm.isNew) {
                    UserService.createExecutive(vm.user).then(function (data) {
                        noty.showSuccess("Executive Added");
                        $state.go('executives')
                    }, function (error) {
                    });
                } else {
                    UserService.updateExecutive($state.params.id, vm.user).then(function (data) {
                        if (data) {
                            noty.showSuccess("Executive Updated");
                            $state.go('executives')
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
                getUser($state.params.id);
            } else {
                vm.isNew = true;
            }
        }
        init();
    }

    function assignedFarmersController(UserService, noty, $uibModalInstance, executive) {
        var vm = this;
        vm.farmers = [];
        vm.cancel = cancel;

        function getFarmers(id) {
            UserService.getFarmerByExecutive(id).then(function (data) {
                vm.farmers = data;
            }, function (error) {
                //FlashService.Error("Error");
            })
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        function init() {
            if (executive && executive._id) {
                getFarmers(executive._id);
            } else {
                cancel();
            }
        }
        init();
    }

})();