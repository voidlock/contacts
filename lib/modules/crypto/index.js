'use strict'

var crypto = require('crypto');

module.exports = angular.module('contacts.crypto', [])
  .factory('$crypto', function() {
    return {
      md5: function (data) {
        return crypto.createHash('md5').update(data).digest('hex');
      }
    };
  });
