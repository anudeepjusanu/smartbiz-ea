(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', Service);

    function Service($http, $q) {
        var service = {};
        var userUrl = '/api/v1';
        service.login = login;
        service.register = register;
        service.logout = logout;
        service.GetCurrent = GetCurrent;
        service.getAllFarmers = getAllFarmers;
        service.getAllExecutives = getAllExecutives;
        service.createExecutive = createExecutive;
        service.getUserById = getUserById;
        service.getUserbyMobile = getUserbyMobile;
        service.Update = Update;
        service.Delete = Delete;
        service.getFarmerByExecutive = getFarmerByExecutive;
        service.GetEmployeeInfo = GetEmployeeInfo;
        service.UpdateEmployeeInfo = UpdateEmployeeInfo;
        service.releaseToPool = releaseToPool;
        service.releaseFromPool = releaseFromPool;
        service.userPoolLogs = userPoolLogs;
        service.getUserRoles = getUserRoles;
        service.updatePushToken = updatePushToken;
        service.remindUserByMessage = remindUserByMessage;
        service.getMyLeaveWallet = getMyLeaveWallet;
        service.getMyLeaveWalletBalance = getMyLeaveWalletBalance;
        service.updateUserLeaveBalance = updateUserLeaveBalance;

        return service;

        function login(loginObj) {
            return $http.post(userUrl + '/authenticate/login', loginObj).then(handleSuccess, handleError);
        }

        function register(registerObj) {
            return $http.post(userUrl + '/authenticate/register', registerObj).then(handleSuccess, handleError);
        }

        function logout() {
            return $http.get(userUrl + '/authenticate/login').then(handleSuccess, handleError);
        }

        function GetCurrent() {
            return $http.get(userUrl + '/user/current').then(handleSuccess, handleError);
        }

        function getAllFarmers() {
            return $http.get(userUrl + '/user/farmers').then(handleSuccess, handleError);
        }

        function getAllExecutives() {
            return $http.get(userUrl + '/user/executives').then(handleSuccess, handleError);
        }

        function createExecutive(user) {
            return $http.post(userUrl + '/user/executives', user).then(handleSuccess, handleError);
        }

        function getUserById(id) {
            return $http.get(userUrl + '/user?id=' + id).then(handleSuccess, handleError);
        }

        function getUserbyMobile(mobile) {
            return $http.get(userUrl + '/user?mobile=' + mobile).then(handleSuccess, handleError);
        }

        function Update(user) {
            return $http.put(userUrl + '/user?id=' + user._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }

        function getFarmerByExecutive(executiveId) {
            return $http.get(userUrl + '/user?executiveId=' + executiveId).then(handleSuccess, handleError);
        }

        function GetEmployeeInfo(_id) {
            return $http.get('/api/users/admin/' + _id).then(handleSuccess, handleError);
        }

        function UpdateEmployeeInfo(_id, employee) {
            return $http.put('/api/users/adminUpdate/' + _id, employee).then(handleSuccess, handleError);
        }

        function releaseToPool(_id, params) {
            return $http.post('/api/users/releaseToPool/' + _id, params).then(handleSuccess, handleError);
        }

        function releaseFromPool(_id, params) {
            return $http.post('/api/users/releaseFromPool/' + _id, params).then(handleSuccess, handleError);
        }

        function userPoolLogs(_id) {
            return $http.get('/api/users/userPoolLogs/' + _id).then(handleSuccess, handleError);
        }

        function getUserRoles() {
            return [{ id: "employee", name: "Employee" }, { id: "lead", name: "Lead" }, { id: "manager", name: "Manager" }];
        }

        function updatePushToken(user) {
            return $http.put('/api/users/updatePushToken/' + user._id, user).then(handleSuccess, handleError);
        }

        function remindUserByMessage(userId, message) {
            return $http.post('/api/users/remind/user/' + userId, message).then(handleSuccess, handleError);
        }

        function getMyLeaveWallet() {
            return $http.get('/api/users/myLeaveWallet/').then(handleSuccess, handleError);
        }

        function getMyLeaveWalletBalance() {
            return $http.get('/api/users/myLeaveWalletBalance/').then(handleSuccess, handleError);
        }

        function updateUserLeaveBalance(_id, obj) {
            return $http.post('/api/leaves/updateUserLeaveBalance/' + _id, obj).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();