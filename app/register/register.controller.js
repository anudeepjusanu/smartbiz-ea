(function () {
    'use strict';

    angular
        .module('app')
        .controller('Register.IndexController', RegisterController);

    function RegisterController(UserService, $window, $state, $http, $timeout, noty) {
        var vm = this;
        vm.registerObj = {

        };
        vm.register = register;

        function register(registerForm) {
            if (registerForm.$valid) {
                UserService.register(vm.registerObj).then(function (data) {
                    if (data && data.token) {
                        noty.showSuccess("Register Success!! Please login");
                        $timeout(function () {
                            $state.go('login');
                        });

                    }
                }, function (error) {
                    console.log(error);
                    noty.showError("Something went wrong");
                });
            } else {
                noty.showError("Something went wrong");
            }

        }

        function init() {

        };
        //init();
    };

})();