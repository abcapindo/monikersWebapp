(function () {
        'use strict';

        angular
            .module('app', ['ngAnimate', 'ngRoute'])
            .config(routeConfig);

        routeConfig.$inject = ['$routeProvider'];

        function routeConfig($routeProvider) {
            $routeProvider
                .when('/home',{ templateUrl: '/people/people.html', title: 'people'})
                .when('/create',{ templateUrl: 'app/avengers/avengers.html', title: 'avengers'})
                .otherwise({ redirectTo: '/' });
        }
    })();
