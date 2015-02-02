'use strict';

var test = require('tape');
var stoke = require('../');

test('single token', function(t) {
  t.looseEqual(stoke('foo'), [
    { type: 'unquoted', body: 'foo' }
  ]);
  t.end();
});

test('multiple tokens', function(t) {
  [ 'foo bar', ' foo bar ' ].forEach(function(v) {
    t.looseEqual(stoke(v), [
      { type: 'unquoted', body: 'foo' },
      { type: 'unquoted', body: 'bar' }
    ]);
  });
  t.looseEqual(stoke('foo'), [
    { type: 'unquoted', body: 'foo' }
  ]);
  t.end();
});
