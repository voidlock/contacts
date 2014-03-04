'use strict';

var angular = require('angular');

angular.module('contacts', [
  require('./modules/crypto').name,
  require('./modules/gravatar').name,
  require('./modules/contacts').name,
  require('./modules/version').name,
  require('./modules/states').name
]);
