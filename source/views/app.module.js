(function () {
        'use strict';

        angular
            .module('app', ['ngRoute', 'ngAnimate', 'ngTouch', 'ui.bootstrap'])
            .config(routeConfig)
            .run(runSetup);

        routeConfig.$inject = ['$routeProvider'];
        runSetup.$inject = ['$rootScope'];

        function routeConfig($routeProvider) {
            $routeProvider
                .when('/home',{
                  templateUrl: 'views/home.html'
                })
                .when('/create',{
                  templateUrl: 'views/create.html'
                })
                .when('/rules', {
                  templateUrl: 'views/rules.html'
                })
                .when('/game', {
                  templateUrl: 'views/game.html'
                })
                .otherwise({ redirectTo: '/home' });
        }

        function runSetup($rootScope) {
          var config = {
            apiKey: "AIzaSyAJcvP5CWKVtwVF8k4w6B7Ff5J_VYW-qbs",
            authDomain: "moniker-efa07.firebaseapp.com",
            databaseURL: "https://moniker-efa07.firebaseio.com",
            projectId: "moniker-efa07",
            storageBucket: "moniker-efa07.appspot.com",
            messagingSenderId: "319966881642"
          };
          $rootScope.firebase = firebase.initializeApp(config);

          // firebase.database().ref('/Cards/' + 1).once('value').then(function(snapshot) {
          //   var card = snapshot.val();
          //   $scope.card = card;
          //
          // });
        }
    })();
