'use strict';


var angular = require('angular');

var states = module.exports = angular.module('contacts.states', [
  require('ui-router')
]);

states.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function stateConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider.
      state('contacts', require('./base.js')).
      state('contacts.list', require('./list.js')).
      state('contacts.new', require('./new.js')).
      state('contacts.edit', require('./edit.js')).
      state('contacts.show', require('./show.js'));

  }
]);

states.run(require('./errors.js'));
