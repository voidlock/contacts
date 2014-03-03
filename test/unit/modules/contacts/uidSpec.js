'use strict';

require('../../../../lib/modules/contacts/index.js');
var angular = require('angular'),
ngMock = require('ngMock');

describe('uid', function () {
  var uid = null,
  $timeout = null,
  mock = null;

  beforeEach(angular.mock.module('contacts.contacts'));

  beforeEach(function () {
    mock = {};

    angular.mock.module(function($provide) {
      $provide.value('$localStorage', mock);
    });

    inject(function (_uid_, _$timeout_) {
      uid = _uid_;
      $timeout = _$timeout_;
    });
  });

  it('has default namespace of "uid"', function () {
    expect(mock.uid).toBeDefined();
  });

  it('starts counting at 0', function () {
    expect(uid.current()).toEqual(0);
  });

  it('computes the next uid', function () {
    expect(uid.next()).toEqual(1);
  });

  it('computs sequential uids', function () {
    expect(uid.next()).toEqual(1);
    expect(uid.current()).toEqual(1);
    expect(uid.next()).toEqual(2);
    expect(uid.current()).toEqual(2);
    expect(uid.next()).toEqual(3);
    expect(uid.current()).toEqual(3);
  });
});

describe('uidProvider', function () {
  var uid = null,
  $timeout = null,
  mock = null;

  beforeEach(angular.mock.module('contacts.contacts'));

  it('uses customized namespace', function () {
    mock = {};

    angular.mock.module(function($provide, uidProvider) {
      $provide.value('$localStorage', mock);
      uidProvider.setNamespace('whatever');
    });

    inject(function (uid) {
      expect(mock.uid).toBeUndefined();
      expect(mock.whatever).toBeDefined();
    });
  });

  it('starts from stored uid point', function () {
    mock = { uid: 12 };

    angular.mock.module(function($provide, uidProvider) {
      $provide.value('$localStorage', mock);
      uidProvider.setNamespace('uid');
    });

    inject(function (uid) {
      expect(uid.current()).toEqual(12);
      expect(uid.next()).toEqual(13);
    });
  });
});

