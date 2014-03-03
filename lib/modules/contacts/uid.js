'use strict';

module.exports = function () {
  var namespace = 'uid';

  this.setNamespace = function (value) {
    namespace = value;
  };

  this.$get = ['$timeout', '$localStorage', function($timeout, $localStorage) {
    var uid = $localStorage[namespace];
    /* jshint -W041 */
    if (uid == null) {
    /* jshint +W041 */
      uid = $localStorage[namespace] = 0;
    }

    return {
      current: function () {
        return uid;
      },
      next: function () {
        return (uid += 1);
      }
    };
  }];
};
