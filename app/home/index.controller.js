
(function () {
    'use strict';

    angular
        .module('app')
        .controller('Home.IndexController', Controller)
        .controller('Home.SidebarController', SidebarController)

    function Controller(UserService, OrderService, _, $interval, $window) {
        var vm = this;
        vm.farmers = [];
        vm.executives = [];
        vm.date;
        vm.user = null;
        vm.gotoFarmers = gotoFarmers;
        vm.gotoExecutives = gotoExecutives;
        vm.farmerOrders = [];

        var tick = function () {
            vm.date = new Date();
        }
        tick();
        $interval(tick, 1000);

        function GetFarmers() {
            UserService.getAllFarmers().then(function (data) {
                vm.farmers = data;
            }, function (error) {
                console.log(error);
            });
        };
        function getAllExecutives() {
            UserService.getAllExecutives().then(function (data) {
                vm.executives = data;
            }, function (error) {
                console.log(error);
            });
        };

        function gotoExecutives() {
            if (vm.user && vm.user.role === 'admin') {
                $state.go('executives');
            }
        }

        function gotoFarmers() {
            if (vm.user && (vm.user.role === 'admin' || vm.user.role === 'EXECUTIVE')) {
                $state.go('farmers');
            }
        }

        function getMyOrders(id) {
            OrderService.getOrderByFarmer(id).then(function (orders) {
                vm.farmerOrders = orders;
            }, function (error) {

            })
        }

        var init = function () {
            GetFarmers();
            getAllExecutives();
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
                if (vm.user && vm.user.role === 'FARMER') {
                    getMyOrders(vm.user._id);
                }
            });
        };
        init();
    }

    function SidebarController(UserService) {
        var vm = this;
        vm.user = null;
        UserService.GetCurrent().then(function (user) {
            vm.user = user;
        });
    }

})();