'use strict';

module.exports = ['database', contactProvider];

function contactProvider(database){
  function Contact(attributes) {
    angular.extend(this, attributes || {});
  }

  Contact.prototype.$save = function () {
    return database.save(this);
  };

  Contact.prototype.$delete = function () {
    return database.remove(this.id);
  };

  Contact.get = function (index) {
    return database.get(index).then(function(attributes) {
      return new Contact(attributes);
    });
  };

  Contact.query = function () {
    return database.query().then(function(array) {
      var contacts = [];
      angular.forEach(array, function(value) {
        contacts.push(new Contact(value));
      });
      return contacts;
    });
  };

  return Contact;
}
