'use strict';

require('../../../../lib/modules/contacts/index.js');
var angular = require('angular'),
ngMock = require('ngMock');

describe('Contact', function() {
  var database,
  $timeout,
  Contact,
  $localStorage;

  beforeEach(ngMock.module('contacts.contacts'));

  beforeEach(function() {
    angular.mock.module(function($provide) {
      // ensure we aren't reading from the real localStorage
      $provide.value('$localStorage', {});
    });

    inject(function(_$timeout_, _database_, _Contact_, _$localStorage_) {
      $timeout = _$timeout_;
      database = _database_;
      Contact = _Contact_;
      $localStorage = _$localStorage_;
    });
  });

  describe('its interface', function() {
    it('has a class level "get" method', function () {
      expect(Contact.get).toBeDefined();
    });

    it('has a class level "query" method', function () {
      expect(Contact.query).toBeDefined();
    });

    it('has an instance level "$save" method', function () {
      var contact = new Contact();
      expect(contact.$save).toBeDefined();
    });

    it('has an instance level "$delete" method', function () {
      var contact = new Contact();
      expect(contact.$delete).toBeDefined();
    });
  });

  it('extends itself with given attributes', function () {
    var contact = new Contact({name: 'Alex'});
    expect(contact.name).toEqual('Alex');
  });

  it('can save itself to database', function () {
    var contact = new Contact({name: 'Alex'});
    spyOn(database, 'save');

    contact.$save();
    expect(database.save).toHaveBeenCalledWith(contact);
  });

  it('can delete itself from database', function () {
    var contact = new Contact({name: 'Alex'});
    contact.$save().then(function () {
      expect(contact.id).toBeDefined();

      spyOn(database, 'remove');
      contact.$delete();
      expect(database.remove).toHaveBeenCalledWith(contact.id);
    });
  });

  it('can be retrieved', function () {
    var contact = new Contact({name: 'Alex'});
    contact.$save();

    $timeout.flush();
    expect(contact.id).toBeDefined();

    spyOn(database, 'get').andCallThrough();

    Contact.get(contact.id).then(function (retrieved) {
      expect(database.get).toHaveBeenCalledWith(contact.id);
      expect(retrieved).toEqual(contact);
    });

    $timeout.flush();
  });

  it('can query for all contacts', function () {
    var alex = new Contact({name: 'Alex'});
    var brian = new Contact({name: 'Brian'});

    alex.$save();
    brian.$save();
    $timeout.flush();

    expect(alex.id).toBe(1);
    expect(brian.id).toBe(2);

    Contact.query().then(function (contacts) {
      expect(contacts.length).toBe(2);
      expect(contacts[0]).toEqual(alex);
      expect(contacts[1]).toEqual(brian);
    });

    $timeout.flush();
  });
});

