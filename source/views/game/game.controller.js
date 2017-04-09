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
