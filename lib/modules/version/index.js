'use strict';

var angular = require('angular'),
version = require('../../../package.json').version;

module.exports = angular.module('contacts.version', []).
  constant('version', version).
  directive('appVersion', ['version', appVersion]);

function appVersion(version) {
  return function(scope, elm, attrs) {
    elm.text(version);
  };
}
