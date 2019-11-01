(function () {
    'use strict';

    angular
        .module('app')
        .controller('Farmers.IndexController', Controller)
        .controller('Farmers.ViewController', ViewController)
        .controller('Farmers.AssignExecutive', AssignExecutive)

    function Controller(UserService, noty, $uibModal) {
        var vm = this;
        vm.farmers = [];
        vm.user = null;
        vm.deleteFarmer = deleteFarmer;
        vm.assignExecutive = assignExecutive;

        function getFarmers() {
            UserService.getAllFarmers().then(function (data) {
                vm.farmers = data;
            }, function (error) {
                console.log(error);
            })
        };

        function assignExecutive(user) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'farmers/assignExecutive.html',
                controller: 'Farmers.AssignExecutive',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    user: function () {
                        return user;
                    }
                }
            });

            modalInstance.result.then(function (userObj) {
                getFarmers();
            }, function () {
                //$log.info('Modal dismissed at: ' + new Date());
            });
        }

        function deleteFarmer(id) {
            UserService.deleteUser(id).then(function (data) {
                if (data) {
                    noty.showSuccess("Inactive Success");
                    getOrders();
                }
            }, function (error) {
                console.log(error);
            })
        }

        var init = function () {
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
            getFarmers();
        };
        init();
    }

    function ViewController(UserService, noty, $state) {
        var vm = this;
        vm.farmer = {};
        vm.user = null;
        function getFarmer(id) {
            UserService.getUserById(id).then(data => {
                console.log(data);
                vm.farmer = data;
            }, error => {

            })
        };


        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });

        var init = function () {
            if ($state.params && $state.params.id) {
                getFarmer($state.params.id);
            } else {
                $state.go('home');
            }
        };
        init();
    }

    function AssignExecutive($uibModalInstance, UserService, noty, user) {
        var vm = this;
        vm.executives = [];
        vm.assign = assign;
        vm.cancel = cancel;
        var assignObj = {};

        function getAllExecutives() {
            UserService.getAllExecutives().then(function (data) {
                vm.executives = data;
            }, function (error) {
                console.log(error);
            });
        };

        function assign(executive) {
            assignObj = {
                "_id": user._id,
                "executiveId": executive._id,
                "executiveName": executive.firstName + " " + executive.lastName
            }
            UserService.Update(assignObj).then(function (data) {
                noty.showSuccess("Assigned successfully!");
                $uibModalInstance.close();
            }, function (error) {
                console.log(error);
            });
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };


        function init() {
            getAllExecutives();
        }
        init();
    }

})();