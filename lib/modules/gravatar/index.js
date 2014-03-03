'use strict';

var crypto = require('../crypto');

module.exports = angular.module('contacts.gravatar', [
  crypto.name
]).
  directive('gravatar', ['$crypto', gravatarDirective]);

function gravatarDirective($crypto) {
  return {
    scope: {
      gravatar: '@',
      size: '@'
    },
    restrict: 'A',
    replace: true,
    link: function (scope) {
      scope.hash = $crypto.md5(scope.gravatar);
    },
    template: '<img ng-src="http://www.gravatar.com/avatar/{{hash}}.jpg?s={{size | number: 80}}">'
  };
}
