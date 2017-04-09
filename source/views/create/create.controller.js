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
