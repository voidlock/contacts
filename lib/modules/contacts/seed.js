'use strict';

module.exports = ['$q', 'defaultContacts', 'Contact', seed];

function seed($q, defaultContacts, Contact) {
  return {
    seed: function () {
      return Contact.query().then(function (contacts) {
        if (contacts.length > 0) {
          return $q.when(contacts);
        } else {
          return defaultContacts.get().then(function (contacts) {
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
          });
        }
      });
    }
  };
}
