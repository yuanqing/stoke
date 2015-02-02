'use strict';

var test = require('tape');
var stoke = require('../');

test('no tokens', function(t) {
  [ '', ' ', '  ' ].forEach(function(v) {
    t.looseEqual(stoke(v), []);
  });
  t.end();
});
