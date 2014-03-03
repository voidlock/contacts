'use strict';

require('../../../../lib/modules/contacts/index.js');
var ngMock = require('ngMock');

describe('initialContactsSeed', function() {
  var ngMock = require('ngMock'),
  module = ngMock.module,
  inject = ngMock.inject;

  var $q, $rootScope,  defaultContacts, Contact, initialContactsSeed;

  beforeEach(module('contacts.contacts'));

  beforeEach(function() {
    inject(function(_$q_, _$rootScope_, _defaultContacts_, _Contact_, _initialContactsSeed_) {
      $q = _$q_;
      $rootScope = _$rootScope_;
      defaultContacts = _defaultContacts_;
      Contact = _Contact_;
      initialContactsSeed = _initialContactsSeed_;
    });
  });

  it('returns previously stored contacts', function () {
    var deferred = $q.defer(),
    promise = deferred.promise,
    contacts = [new Contact({name: 'alex'}), new Contact({name: 'brian'})];

    spyOn(Contact, 'query').andReturn(promise);

    initialContactsSeed.seed().then(function (results) {
      expect(results).toBe(contacts);
    });

    deferred.resolve(contacts);
    $rootScope.$apply();
  });

  it('returns previously stored contacts', function () {
    var deferredQuery = $q.defer(),
    deferredDefaults = $q.defer(),
    contacts = [new Contact({name: 'alex'}), new Contact({name: 'brian'})];

    spyOn(Contact, 'query').andReturn(deferredQuery.promise);
    spyOn(defaultContacts, 'get').andReturn(deferredDefaults.promise);

    initialContactsSeed.seed().then(function (results) {
      expect(defaultContacts.get).toHaveBeenCalled();
      expect(results).toBe(contacts);
    });

    deferredQuery.resolve([]);
    deferredDefaults.resolve(contacts);

    $rootScope.$apply();
  });
});
