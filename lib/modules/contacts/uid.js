'use strict';

module.exports = UidProvider;

function UidProvider() {
  var namespace = 'uid';

  this.setNamespace = function (value) {
    namespace = value;
  };

  this.$get = ['$timeout', '$localStorage', function($timeout, $localStorage) {
    /* jshint -W041 */
    if ($localStorage[namespace] == null) {
    /* jshint +W041 */
      $localStorage[namespace] = 0;
    }

    return {
      current: function () {
        return $localStorage[namespace];
      },
      next: function () {
        return ($localStorage[namespace] += 1);
      }
    };
  }];
}
