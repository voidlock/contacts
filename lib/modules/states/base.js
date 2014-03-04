'use strict';
module.exports = {
  "abstract": true,
  "url": '',
  "resolve": {
    "contacts": ['initialContactsSeed', function (initial) {
      var seed = initial.seed();
      return seed;
    }]
  },
  "templateUrl": 'partials/contacts.html',
  "controller": ['$scope', '$state', 'contacts', function($scope, $state, seed){
    $scope.newContact = function() {
      $state.go('contacts.new');
    };

    $scope.isSelectedContact = function (index) {
      return index == $state.params.id;
    };

    $scope.contacts = seed;
  }]
};
