'use strict';

module.exports = {
  url: '/new',
  resolve: {
    selected: function resolveNewSelected() {
      return {};
    }
  },
  templateUrl: 'partials/contacts-form.html',
  controller: require('./form-ctrl.js')
};
