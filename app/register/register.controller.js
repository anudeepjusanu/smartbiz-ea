(function () {
    'use strict';

    angular
        .module('app')
        .controller('Register.IndexController', RegisterController);

    function RegisterController(UserService, $window, $state, Upload, $timeout, noty) {
        var vm = this;
        vm.registerObj = {

        };
        vm.register = register;
        vm.files = {};
        function uploadImages(userId){
            for(var i in vm.files){
                Upload.upload({
                    url: 'http://locahost:3000/user/uploadImage?id='+userId,
                    data: {
                        file: vm.files[i],
                        type: i
                    }
                }).then(function (resp) {
                    noty.showSuccess("Register Success!! Please login");
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                });
            };
        }

        function register(registerForm) {
            if (registerForm.$valid) {
                vm.registerObj.role = 'FARMER';
                UserService.register(vm.registerObj).then(function (data) {
                    if (data && data._id) {
                        uploadImages(data._id);

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
                noty.showError("Please fill mandatory values");
            }

        }

        function init() {

        };
        //init();
    };

})();