'use strict';

var angular = require('angular'),
version = require('../../../package.json').version;

module.exports = angular.module('contacts.version', []).
  constant('VERSION', version).
  directive('appVersion', ['VERSION', appVersion]);

function appVersion(VERSION) {
  return function(scope, elm, attrs) {
    elm.text(VERSION);
  };
}
