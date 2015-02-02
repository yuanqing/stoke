'use strict';

var test = require('tape');
var stoke = require('../');

test('empty', function(t) {
  [ '', ' ', '  ' ].forEach(function(v) {
    t.looseEqual(stoke(v), []);
  });
  t.end();
});
