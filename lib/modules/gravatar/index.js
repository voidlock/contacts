'use strict';

var crypto = require('../crypto'),
angular = require('angular');

module.exports = angular.module('contacts.gravatar', [
  crypto.name
]).
  directive('gravatar', ['$crypto', gravatarDirective]);

function gravatarDirective($crypto) {
  return {
    scope: {
      gravatar: '=',
      size: '=?'
    },
    restrict: 'A',
    replace: true,
    link: function (scope, elem, attrs) {
      if (isNaN(parseInt(scope.size, 10))) {
        scope.size = 80;
      }

      function watchEmail(newValue, oldValue) {
        if (newValue !== oldValue) {
          scope.hash = $crypto.md5(scope.gravatar || "");
        }
      }
      scope.$watch('gravatar', watchEmail);
      watchEmail(scope.gravatar);
    },
    template: '<img ng-src="http://www.gravatar.com/avatar/{{hash}}.jpg?s={{size}}">'
  };
}
