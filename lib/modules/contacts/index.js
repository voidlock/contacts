'use strict';

var angular = require('angular'),
ngStorage = require('ngStorage');

module.exports = angular.module('contacts.contacts', ['ngStorage']).
  factory('defaultContacts', require('./defaults.js')).
  factory('initialContactsSeed', require('./seed.js')).
  provider('uid', require('./uid.js')).
  provider('database', require('./database.js')).
  factory('Contact', require('./contact.js'));
