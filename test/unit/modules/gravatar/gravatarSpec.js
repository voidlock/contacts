'use strict';

require('../../../../lib/modules/gravatar');
var ngMock = require('ngMock');

describe('gravatar', function () {

  var $compile, $scope;

  beforeEach(ngMock.module('contacts.gravatar'));

  beforeEach(ngMock.module(function($provide) {
    $provide.factory('$crypto', function() {
      return {
        md5: function (data) {
          return "HASHED--" + data;
        }}
    });
  }));

  // Angular strips the underscores when injecting
  beforeEach(ngMock.inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $scope = _$rootScope_.$new({});
  }));

  it('renders gravatar img with default size', function () {
    $scope.contact = {
      email: "alex.arnell@gmail.com"
    };
    var element = $compile('<img gravatar="contact.email">')($scope);
    $scope.$digest();
    expect(element.attr('src')).toEqual('http://www.gravatar.com/avatar/HASHED--alex.arnell@gmail.com.jpg?s=80');
  });

  it('renders gravatar img with specific size', function () {
    var element = $compile("<img gravatar=\"'alex.arnell@gmail.com'\" size=40>")($scope);
    $scope.$digest();
    expect(element.attr('src')).toEqual('http://www.gravatar.com/avatar/HASHED--alex.arnell@gmail.com.jpg?s=40');
  });

  it('watches for changes to gravatar email', function () {
    $scope.contact = {
      email: "alex.arnell@gmail.com"
    };
    var element = $compile('<img gravatar="contact.email">')($scope);
    $scope.$digest();
    expect(element.attr('src')).toEqual('http://www.gravatar.com/avatar/HASHED--alex.arnell@gmail.com.jpg?s=80');
    $scope.contact = {
      email: 'alex.arnell+changed@gmail.com'
    };
    $scope.$digest();
    expect(element.attr('src')).toEqual('http://www.gravatar.com/avatar/HASHED--alex.arnell+changed@gmail.com.jpg?s=80');
  });


});
