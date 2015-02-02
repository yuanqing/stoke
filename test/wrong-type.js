'use strict';

var test = require('tape');
var stoke = require('../');

test('throws if `str` is not a string', function(t) {
  t.throws(function() {
    stoke({});
  });
  t.end();
});
