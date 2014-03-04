'use strict';

module.exports = ['$rootScope', '$state', globalErrorHandler];

function globalErrorHandler($rootScope, $state) {
  function stateChangeErrorHandler(event, toState, toParams, fromState, fromParams, error) {
    if (event.name === '$stateChangeError' && error === 'not found') {
      $state.go('contacts.list', {});
    }
  }
  $rootScope.$on('$stateChangeError', stateChangeErrorHandler);
}
