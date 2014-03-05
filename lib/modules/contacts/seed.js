'use strict';

var angular = require('angular');

module.exports = ['$q', 'defaultContacts', 'Contact', seed];

function seed($q, defaultContacts, Contact) {
  function maybeFetchDefaults(contacts) {
    if (contacts.length === 0) {
      contacts = defaultContacts.get();
    }
    return contacts;
  }

  function saveAll(contacts) {
    var deferredSaves = [],
    promise;

    angular.forEach(contacts, function(contact) {
      promise = contact.$save().then(function () {
        return contact;
      });
      deferredSaves.push(promise);
    });

  // wrap all pending saves in a promise
  return $q.all(deferredSaves);
}
  return {
    seed: function () {
      return Contact.query().
        then(maybeFetchDefaults).
        then(saveAll);
    }
  };
}
