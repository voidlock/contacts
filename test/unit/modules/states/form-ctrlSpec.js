'use strict';

require('../../../../lib/modules/contacts');
var formCtrl = require('../../../../lib/modules/states/form-ctrl.js');

var angular = require('angular');
var ngMock = require('ngMock');
var uiRouter = require('ui-router');

describe('FormCtrl', function () {
  var $controller, $timeout, $localStorage, Contact;

  beforeEach(ngMock.module('contacts.contacts'));
  beforeEach(ngMock.module(uiRouter));

  beforeEach(function () {
    $localStorage = {};

    ngMock.module(function($provide, $controllerProvider) {
      $controllerProvider.register('FormCtrl', formCtrl);
      // ensure we aren't reading from the real localStorage
      $provide.value('$localStorage', $localStorage);
    });

    ngMock.inject(function(_$controller_, _$timeout_, _Contact_) {
      $controller = _$controller_;
      $timeout = _$timeout_;
      Contact = _Contact_;
    });
  });

  it('assigns the selected person', function () {
    var $scope = {};
    var person = { name: "Alex" };

    $controller('FormCtrl', { $scope: $scope, selected: person });
    expect($scope.person).toEqual(person);
  });

  it('saves a contact', function () {
    var $scope = { contacts: [] };
    var $state = { params: { id: 1 }, go: angular.noop };
    var person = new Contact({ name: "Alex", id: 2 });

    spyOn($state, 'go');

    $controller('FormCtrl', { $state: $state, $scope: $scope, selected: {} });
    expect($scope.saveContact).toBeDefined();

    $scope.saveContact(person);
    $timeout.flush();

    expect($scope.contacts).toEqual([person]);
    expect($state.go).toHaveBeenCalledWith('contacts.show', {id: 2});
  });

  it('cancels editing', function () {
    var $scope = {};
    var $state = { params: { id: 1 }, go: angular.noop };
    var person = { name: "Alex" };

    spyOn($state, 'go');

    $controller('FormCtrl', { $state: $state, $scope: $scope, selected: person });
    expect($scope.cancel).toBeDefined();

    $scope.cancel();
    expect($state.go).toHaveBeenCalledWith('contacts.show', {id: 1});
  });
});
