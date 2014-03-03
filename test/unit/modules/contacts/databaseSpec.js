'use strict';

require('../../../../lib/modules/contacts/index.js');
var angular = require('angular'),
ngMock = require('ngMock');

describe('database', function () {
  var database = null,
  $timeout = null,
  mock = null;

  beforeEach(angular.mock.module('contacts.contacts'));

  beforeEach(function () {
    mock = {};

    angular.mock.module(function($provide, databaseProvider) {
      $provide.value('$localStorage', mock);
    });

    inject(function (_database_, _$timeout_) {
      database = _database_;
      $timeout = _$timeout_;
    });
  });

  it('defaults to using "contacts" namespace', function () {
    expect(mock.contacts).toBeDefined();
  });

  it('count is zero by to start with', function () {
    database.count().then(function (count) {
      expect(count).toEqual(0);
    });
    $timeout.flush();
  });

  it('retuns an empty array to start', function () {
    database.query().then(function (objects) {
      expect(objects).toEqual([]);
    });
    $timeout.flush();
  });

  it('saves objects', function () {
    var object = {'hey': 'there'};

    database.save(object).then(function (id) {
      expect(id).toEqual(1);
      expect(mock.contacts[1]).toEqual('{"hey":"there","id":1}');
    });
    $timeout.flush();
  });

  it('retrieves objects', function () {
    var object = {"hey": "there", "id": 1};
    database.save(object);
    $timeout.flush();

    database.get(1).then(function (saved) {
      expect(saved).toEqual(object);
    });
    $timeout.flush();
  });

  it('deletes objects', function () {
    var object = {"hey": "there", "id": 1};
    database.save(object);
    $timeout.flush();

    database.remove(1).then(function (result) {
      expect(result).toEqual(true);
    });
    $timeout.flush();
  });

  it('does not delete missing keys', function () {
    database.remove(1).then(function (result) {
      expect(result).toEqual(false);
    });

    $timeout.flush();
  });

  it('does not delete undefined keys', function () {
    database.remove(undefined).then(function (result) {
      expect(result).toEqual(false);
    });
    $timeout.flush();
  });
});

describe('databaseProvider', function() {
  var mock;

  beforeEach(angular.mock.module('contacts.contacts'));

  beforeEach(function() {
    mock = {};

    angular.mock.module(function(databaseProvider, $provide) {
      databaseProvider.setNamespace('whatever');
      $provide.value('$localStorage', mock);
    });

    inject(function(database) {
      // must inject database
    });
  });

  it('allows customizing the namespace', function () {
    expect(mock.whatever).toBeDefined();
    expect(mock.contacts).toBeUndefined();
  });
});

