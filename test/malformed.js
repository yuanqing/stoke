'use strict';

var test = require('tape');
var stoke = require('../');

test('malformed', function(t) {
  [ 'echo "foo `echo \'bar baz\'`',
    'echo "foo `echo \'bar baz\'"',
    'echo "foo `echo \'bar baz\''
  ].forEach(function(str) {
    t.throws(function() {
      stoke(str);
    });
  });
  t.end();
});
