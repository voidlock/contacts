'use strict';

var angular = require('angular');

module.exports = DatabaseProvider;

function DatabaseProvider() {
  var namespace = 'contacts';

  this.setNamespace = function (value) {
    namespace = value;
  };

  this.$get = ['$timeout', '$localStorage', 'uid', databaseServiceFn];

  function databaseServiceFn($timeout, $localStorage, uid) {
    // $timeout returns a promise, allowing me to keep a consistent interface
    // if the database backend changes to something fetched over http

    var database = $localStorage[namespace];
    /* jshint -W041 */
    if (database == null) {
      database = $localStorage[namespace] = {};
    }
    /* jshint +W041 */
    function ensureObjectId(object) {
      return $timeout(function () {

        /* jshint -W041 */
        if (object.id == null) {
          object.id = uid.next();
        }
        /* jshint +W041 */
        return object;
      });
    }

    function deserialize(json) {
      return angular.fromJson(json);
    }

    function serialize(object) {
      return {
        key: object.id,
        value: angular.toJson(object)
      };
    }

    function store(resource) {
      database[resource.key] = resource.value;
      return resource.key;
    }

    function retrieve(key) {
      return $timeout(function() {
        return database[key];
      });
    }

    function count() {
      return $timeout(function () {
        return Object.keys(database).length;
      });
    }

    function query() {
      return $timeout(function () {
        var values = [];
        angular.forEach(database, function(value) {
          values.push(deserialize(value));
        });

        return values;
      });
    }

    function save(object) {
      return ensureObjectId(object).
        then(serialize).
        then(store);
    }

    function get(key) {
      return retrieve(key).then(deserialize);
    }

    function remove(key) {
      return $timeout(function () {
        if (database[key] !== undefined) {
          return delete database[key];
        }
        return false;
      });
    }

    return {
      count: count,
      query: query,
      save: save,
      get: get,
      remove: remove
    };
  }
}

