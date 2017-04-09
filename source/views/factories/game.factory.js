function GameFactory() {
  var game = {};
  game.teamOne = "";
  game.teamTwo = "";

  game.timeLimit = 60;
  return game;
}

angular.module('app')
  .factory('GameFactory', GameFactory);
