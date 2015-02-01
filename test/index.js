'use strict';

var test = require('tape');
var stoke = require('../');

test('is a function', function(t) {
  t.true(typeof stoke === 'function');
  t.end();
});

test('throws if `str` is not a string', function(t) {
  t.throws(function() {
    stoke({});
  });
  t.end();
});

test('no tokens', function(t) {
  [ ['', []],
    [' ', []],
    ['  ', []],
    ['\t', []],
  ].forEach(function(v) {
    t.looseEqual(stoke(v[0]), v[1]);
  });
  t.end();
});

test('bare tokens', function(t) {
  [ ['foo', ['foo']],
    ['foo bar baz', ['foo', 'bar', 'baz']]
  ].forEach(function(v) {
    t.looseEqual(stoke(v[0]), v[1]);
  });
  t.end();
});

test('single-quoted tokens', function(t) {
  t.test('without nested quoted tokens', function(t) {
    [ ['\'\'', ['\'\'']],
      ['\' \'', ['\' \'']],
      ['\'  \'', ['\'  \'']],
      ['\'foo\'', ['\'foo\'']],
      ['\'foo\' \'bar\'', ['\'foo\'', '\'bar\'']],
      ['\'foo bar\'', ['\'foo bar\'']],
      ['\'foo bar\' \'baz qux\'', ['\'foo bar\'', '\'baz qux\'']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('with nested quoted tokens', function(t) {
    [ ['\'""\'', ['\'""\'']],
      ['\'" "\'', ['\'" "\'']],
      ['\'"  "\'', ['\'"  "\'']],
      ['\'"foo"\'', ['\'"foo"\'']],
      ['\'"foo" "bar"\'', ['\'"foo" "bar"\'']],
      ['\'``\'', ['\'``\'']],
      ['\'` `\'', ['\'` `\'']],
      ['\'`  `\'', ['\'`  `\'']],
      ['\'`foo`\'', ['\'`foo`\'']],
      ['\'`foo` `bar`\'', ['\'`foo` `bar`\'']],
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
});

test('double-quoted tokens', function(t) {
  t.test('without nested quoted tokens', function(t) {
    [ ['""', ['""']],
      ['" "', ['" "']],
      ['"  "', ['"  "']],
      ['"foo"', ['"foo"']],
      ['"foo" "bar"', ['"foo"', '"bar"']],
      ['"foo bar"', ['"foo bar"']],
      ['"foo bar" "baz qux"', ['"foo bar"', '"baz qux"']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('with nested quoted tokens', function(t) {
    [ ['"\'\'"', ['"\'\'"']],
      ['"\' \'"', ['"\' \'"']],
      ['"\'  \'"', ['"\'  \'"']],
      ['"\'foo\'"', ['"\'foo\'"']],
      ['"\'foo\' \'bar\'"', ['"\'foo\' \'bar\'"']],
      ['"``"', ['"``"']],
      ['"` `"', ['"` `"']],
      ['"`  `"', ['"`  `"']],
      ['"`foo`"', ['"`foo`"']],
      ['"`foo` `bar`"', ['"`foo` `bar`"']],
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
});

test('back-quoted tokens', function(t) {
  t.test('without nested quoted tokens', function(t) {
    [ ['``', ['``']],
      ['` `', ['` `']],
      ['`  `', ['`  `']],
      ['`foo`', ['`foo`']],
      ['`foo` `bar`', ['`foo`', '`bar`']],
      ['`foo bar`', ['`foo bar`']],
      ['`foo bar` `baz qux`', ['`foo bar`', '`baz qux`']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('with nested quoted tokens', function(t) {
    [ ['`\'\'`', ['`\'\'`']],
      ['`\' \'`', ['`\' \'`']],
      ['`\'  \'`', ['`\'  \'`']],
      ['`\'foo\'`', ['`\'foo\'`']],
      ['`\'foo\' \'bar\'`', ['`\'foo\' \'bar\'`']],
      ['`""`', ['`""`']],
      ['`" "`', ['`" "`']],
      ['`"  "`', ['`"  "`']],
      ['`"foo"`', ['`"foo"`']],
      ['`"foo" "bar"`', ['`"foo" "bar"`']],
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
});
