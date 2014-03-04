'use strict';

module.exports = ['$state', '$scope', 'Contact', 'selected', FormCtrl];

function FormCtrl($state, $scope, Contact, selected) {
  $scope.person = selected;

  $scope.saveContact = function (attributes) {
    var contact = new Contact(attributes);
    contact.$save().then(function (id) {
      if (parseInt($state.params.id, 10) !== id) {
        $scope.contacts.push(contact);
      }
      $state.go('contacts.show', {id: id});
    });
  };

  $scope.cancel = function () {
    $state.go('contacts.show', {id: $state.params.id});
  };
}
