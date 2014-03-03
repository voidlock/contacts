'use strict'

require('../../../../lib/modules/crypto');
var ngMock = require('ngMock');

describe('$crypto', function () {
  var $crypto = null;

  beforeEach(ngMock.module('contacts.crypto'));

  beforeEach(ngMock.inject(function (_$crypto_) {
    $crypto = _$crypto_;
  }));

  it('computes an md5', function () {
    expect($crypto.md5('alex.arnell@gmail.com')).toEqual('187f6f5537409b85ea3848e24b1d2b94');
  });
});
