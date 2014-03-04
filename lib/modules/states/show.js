'use strict';

var show = require('./show-ctrl.js');

module.exports = {
  url: '/:id',
  resolve: show.resolves,
  templateUrl: 'partials/contacts-show.html',
  controller: show.controller
};

