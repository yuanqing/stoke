'use strict';

var test = require('tape');
var stoke = require('../');

test('unquoted', function(t) {
  [
    [
      'foo', [
        { type: 'unquoted', body: 'foo' }
      ]
    ],
    [
      'foo bar', [
        { type: 'unquoted', body: 'foo' },
        { type: 'unquoted', body: 'bar' }
      ]
    ],
    [
      ' foo bar ', [
        { type: 'unquoted', body: 'foo' },
        { type: 'unquoted', body: 'bar' }
      ]
    ]
  ].forEach(function(v) {
    t.looseEqual(stoke(v[0]), v[1]);
  });
  t.end();
});
