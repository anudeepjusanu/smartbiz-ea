(function () {
    'use strict';

    angular
        .module('app')
        .controller('Account.IndexController', Controller);

    function Controller($window, UserService, noty) {
        var vm = this;

        vm.user = null;
        vm.saveUser = saveUser;
        vm.deleteUser = deleteUser;

        function initController() {
            // get current user
            UserService.GetCurrent().then(function (user) {
                vm.user = user;
            });
        }

        function saveUser(userForm) {
            if (userForm.$valid) {
                UserService.Update(vm.user)
                    .then(function () {
                        noty.showSuccess("Updated Successfully")
                    })
                    .catch(function (error) {

                    });
            }
        }

        function deleteUser() {
            UserService.Delete(vm.user._id)
                .then(function () {
                    // log user out
                    $window.location = '/login';
                })
                .catch(function (error) {

                });
        }
        initController();
    }

})();