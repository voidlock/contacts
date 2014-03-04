'use strict';

exports = module.exports = {};

exports.controller = ['$scope', 'selected', function ($scope, selected) {
  $scope.contact = selected;
}];

exports.resolves = {
  selected: ['$stateParams', 'Contact', 'contacts', function($stateParams, Contact, contacts) {
    // not doing anything with the contacts, but it is required so that the
    // dependency chain of parent -> child resolves works
    return Contact.get($stateParams.id);
  }]
};
