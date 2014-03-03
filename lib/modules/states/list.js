'use strict';

module.exports = {
  url: '/',
  controller: ['$state', 'contacts', ListCtrl]
};

function ListCtrl($state, contacts) {
  $state.go('contacts.show', {id: contacts[0].id});
}
