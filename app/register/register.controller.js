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
                vm.registerObj.role = 'FARMER';
                UserService.register(vm.registerObj).then(function (data) {
                    if (data && data._id) {
                        noty.showSuccess("Register Success!! Please login");
                        $timeout(function () {
                            $state.go('login');
                        });

                    }else if(data && data.errmsg){
                        noty.showError(data.errmsg);
                    }else{
                        noty.showError("Something went wrong");    
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