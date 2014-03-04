'use strict';

var show = require('./show-ctrl.js');

module.exports = {
  url: '/:id/edit',
  resolve: show.resolves,
  templateUrl: 'partials/contacts-form.html',
  controller: require('./form-ctrl.js')
};
