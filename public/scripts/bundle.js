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

function GameFactory() {
  var game = {};
  game.teamOne = "";
  game.teamTwo = "";

  game.timeLimit = 60;
  return game;
}

angular.module('app')
  .factory('GameFactory', GameFactory);


function CreateGameCtrl($scope, $route, $location, GameFactory) {
  $scope.numRounds = 3;
  $scope.timeLimit = 60;
  $scope.numPlayers = 2;

  $scope.addTime = function addTime() {
    $scope.timeLimit += 1;
  }

  $scope.subTime = function subTime() {
    $scope.timeLimit -= 1;
  }

  $scope.submit = function submit() {
    //TODO navigate to game html
    GameFactory.teamOne = $scope.team1Name;
    GameFactory.teamTwo = $scope.team2Name;
    $location.path('/game');
    console.log("submitting game");
  }
}

angular.module('app')
  .controller('CreateGameCtrl', CreateGameCtrl);

function GameCtrl($scope, $rootScope, $route, $interval, GameFactory) {
  var firebase = $rootScope.firebase;
  firebase.database().ref('/Cards/' + 1).once('value').then(function(snapshot) {
    var card = snapshot.val();
    $scope.$apply(function() {
      $scope.card = card;
    })
  });

  // var gameNumbers =
  //
  //
  //
  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min;
  // }


  $scope.time = 5;
  $scope.timeShow = false;
  $scope.gameCardShow = false;
  $scope.startGameShow = true;
  $scope.teams = [];
  $scope.team;
  $scope.teams[0] = GameFactory.teamOne;
  $scope.teams[1] = GameFactory.teamTwo;
  function teamSetup() {
    $scope.teams.push(GameFactory.teamOne);
    $scope.teams.push(GameFactory.teamTwo);
  }

  $scope.startGame = function() {

    $scope.timeShow = true;
    $interval(function() {
      if ($scope.time <= 1) {
        $scope.timeShow = false;
        $interval.cancel();
        $scope.gameCardShow = true;
        $scope.startGameShow = false;
      }
      else {
        $scope.time -= 1;
      }
    }, 1000);
  }

  $scope.teamSelection = function() {
    $scope.team = getRndInteger(0, 1);
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
}



angular.module('app')
  .controller('GameCtrl', GameCtrl);


(function () {
    'use strict';

    angular.module('app')
        .controller('HomeCtrl', HomeCtrl);

    function HomeCtrl($scope, $route, $rootScope) {
      // Initialize Firebase

      var firebase = $rootScope.firebase;
      firebase.database().ref('/Cards/' + 1).once('value').then(function(snapshot) {
        console.log("pulling data");
        var card = snapshot.val();
        $scope.card = card;

      });
    }
})();



