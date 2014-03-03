'use strict';

module.exports = [
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('contacts', require('./base.js')).
      state('contacts.list', require('./list.js')).
      state('contacts.show', require('./show.js')).
      state('contacts.new', require('./new.js'));
  }
];
