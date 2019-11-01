(function () {
    'use strict';

    angular
        .module('app')
        .controller('Login.IndexController', LoginController);

    function LoginController(UserService, $window, $state, $http, $timeout, noty) {
        var vm = this;
        vm.loginObj = {

        };
        vm.login = login;

        function login(loginForm) {
            if (loginForm.$valid) {
                UserService.login(vm.loginObj).then(function (data) {
                    if (data && data.token) {
                        $window.jwtToken = data.token;
                        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
                        $timeout(function () {
                            $state.go('home');
                        });

                    }
                }, function (error) {
                    console.log(error);
                    noty.showError("Something went wrong")
                });
            } else {
                noty.showError("Please fill required fields")
            }

        }

        function init() {

        };
        //init();
    };

})();