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
