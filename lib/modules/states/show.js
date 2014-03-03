'use strict';

var showCtrl = ['$scope', 'selected', function ($scope, selected) {
  $scope.contact = selected;
}];

var resolves = ['$stateParams', 'Contact', function($stateParams, Contact) {
  return Contact.get($stateParams.id);
}];

module.exports = {
  url: '/:id',
  resolve: {
    selected: resolves
  },
  templateUrl: 'partials/contacts-show.html',
  controller: showCtrl
};

