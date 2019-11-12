(function () {
    'use strict';

    angular
        .module('app', ['ui.router', 'ui.toggle', 'ui.select', 'ngSanitize', 'angular-loading-bar', 'ui.bootstrap', 'ngTable', 'notyModule', 'chart.js', 'angular.chips', 'ngFileUpload'])
        .config(config)
        .run(run)
        .constant('_',
            window._
        );

    function config($stateProvider, $urlRouterProvider, ChartJsProvider, $httpProvider) {

        $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.cache = false;

        // default route
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('layout', {
                url: '',
                abstract: true,
                views: {
                    '': {
                        templateUrl: 'layout/layout.html',
                        controller: 'LayoutController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('login', {
                url: '/login',
                templateUrl: 'login/login.html',
                controller: 'Login.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'login' }
            })
            .state('register', {
                url: '/register',
                templateUrl: 'register/register.html',
                controller: 'Register.IndexController',
                controllerAs: 'vm',
                data: { activeTab: 'register' }
            })
            .state('home', {
                url: '/',
                templateUrl: 'home/index.html',
                controller: 'Home.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'home' }
            })
            .state('inventory', {
                url: '/inventory',
                templateUrl: 'inventory/index.html',
                controller: 'Inventory.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'inventory' }
            })
            .state('addInventory', {
                url: '/addInventory',
                templateUrl: 'inventory/addInventory.html',
                controller: 'Inventory.addController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'inventory' }
            })
            .state('updateInventory', {
                url: '/updateInventory/:id',
                templateUrl: 'inventory/addInventory.html',
                controller: 'Inventory.addController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'inventory' }
            })
            .state('orders', {
                url: '/orders',
                templateUrl: 'orders/index.html',
                controller: 'Orders.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'orders' }
            })
            .state('searchFarmer', {
                url: '/order/searchFarmer',
                templateUrl: 'orders/searchFarmer.html',
                controller: 'Orders.searchFarmer',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'orders' }
            })
            .state('addOrder', {
                url: '/addOrder/:farmerId',
                templateUrl: 'orders/addOrder.html',
                controller: 'Orders.addController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'orders' }
            })
            .state('updateOrder', {
                url: '/updateOrder/:farmerId/:id',
                templateUrl: 'orders/addOrder.html',
                controller: 'Orders.addController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'orders' }
            })
            .state('sales', {
                url: '/sales',
                templateUrl: 'sales/index.html',
                controller: 'Sales.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'sales' }
            })
            .state('openOrders', {
                url: '/sales/openOrders',
                templateUrl: 'sales/openOrders.html',
                controller: 'Sales.openOrders',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'sales' }
            })
            .state('farmers', {
                url: '/farmers',
                templateUrl: 'farmers/index.html',
                controller: 'Farmers.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'farmers' }
            })
            .state('viewFarmer', {
                url: '/viewFarmer/:id',
                templateUrl: 'farmers/viewFarmer.html',
                controller: 'Farmers.ViewController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'farmers' }
            })
            .state('executives', {
                url: '/executives',
                templateUrl: 'executives/index.html',
                controller: 'Executives.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'executives' }
            })
            .state('addExecutives', {
                url: '/addExecutives',
                templateUrl: 'executives/addExecutive.html',
                controller: 'Executives.addController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'executives' }
            })
            .state('account', {
                url: '/account',
                templateUrl: 'account/index.html',
                controller: 'Account.IndexController',
                controllerAs: 'vm',
                parent: 'layout',
                data: { activeTab: 'account' }
            })
        ChartJsProvider.setOptions({ colors: ['#1caf9a', '#273541'] });
    }

    function run($http, $rootScope, $window, UserService, $timeout, $state) {
        // add JWT token as default auth header
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;
        $rootScope.$on('$stateChangeStart', function (event, next, params) {
            if (!$window.jwtToken) {
                if (next && next.name != 'login') {
                    if (next.name === 'register') {

                    }
                    else {
                        event.preventDefault();
                        $state.go('login');
                    }
                } else { }

            } else {
                if (next && next.name == 'login') {
                    event.preventDefault();
                    $state.go('home');
                } else { }
            }
        });
        // update active tab on state change
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $timeout(function () {
                $window.dispatchEvent(new Event("resize"));
            }, 100);
            $rootScope.activeTab = toState.data.activeTab;
        });
    }

    // manually bootstrap angular after the JWT token is retrieved from the server
    $(function () {
        // get JWT token from server
        $.get('/api/v1/authenticate/token', function (token) {
            window.jwtToken = token;
            //console.log(token);
            angular.bootstrap(document, ['app']);
        });
    });
})();