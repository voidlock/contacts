'use strict';

module.exports = ['$http', 'Contact', defaultContacts];

function defaultContacts($http, Contact) {
  return {
    get: function () {
      return $http.get('data/defaults.json').then(function (resp) {
        var contacts = [];
        angular.forEach(resp.data, function (attributes) {
          contacts.push(new Contact(attributes));
        });
        return contacts;
      });
    }
  };
}
