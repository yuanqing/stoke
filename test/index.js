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

test('empty string', function(t) {
  t.looseEqual(stoke(''), []);
  t.end();
});

test('space', function(t) {
  t.looseEqual(stoke(' '), []);
  t.looseEqual(stoke('  '), []);
  t.end();
});

test('bare tokens', function(t) {
  [ ['foo', ['foo']],
    ['foo bar', ['foo', 'bar']],
    ['  foo  bar  ', ['foo', 'bar']]
  ].forEach(function(v) {
    t.looseEqual(stoke(v[0]), v[1]);
  });
  t.end();
});

test('single-quoted tokens', function(t) {
  t.test('without nested quotes', function(t) {
    [ ['\'\'', ['\'\'']],
      ['\' \'', ['\' \'']],
      ['\'  \'', ['\'  \'']],
      ['\'foo\'', ['\'foo\'']],
      ['\'foo\' \'bar\'', ['\'foo\'', '\'bar\'']],
      ['\'foo bar\'', ['\'foo bar\'']],
      ['\'foo bar\' \'baz\'', ['\'foo bar\'', '\'baz\'']],
      ['  \' foo bar \'  \' baz \'  ', ['\' foo bar \'', '\' baz \'']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('malformed', function(t) {
    [ '\'',
      ' \'',
      '\' ',
      '\'\'\'',
      '\' \'\'',
      '\'\' \'',
      '\'foo bar',
      'foo\' bar',
      'foo \'bar',
      'foo bar\''
    ].forEach(function(v) {
      t.throws(function() {
        stoke(v);
      });
    });
    t.end();
  });
  t.test('with nested double-quotes', function(t) {
    [ ['\'""\'', ['\'""\'']],
      ['\'" "\'', ['\'" "\'']],
      ['\'"foo"\'', ['\'"foo"\'']],
      ['\'"foo bar"\'', ['\'"foo bar"\'']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ ['\'"\'', ['\'"\'']],
        ['\'" \'', ['\'" \'']],
        ['\'"foo\'', ['\'"foo\'']],
        ['\'"foo bar\'', ['\'"foo bar\'']],
        ['\'foo" bar\'', ['\'foo" bar\'']],
        ['\'foo bar"\'', ['\'foo bar"\'']]
      ].forEach(function(v) {
        t.looseEqual(stoke(v[0]), v[1]);
      });
      t.end();
    });
  });
  t.test('with nested back-quotes', function(t) {
    [ ['\'``\'', ['\'``\'']],
      ['\'` `\'', ['\'` `\'']],
      ['\'`foo`\'', ['\'`foo`\'']],
      ['\'`foo bar`\'', ['\'`foo bar`\'']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ ['\'`\'', ['\'`\'']],
        ['\'` \'', ['\'` \'']],
        ['\'`foo\'', ['\'`foo\'']],
        ['\'`foo bar\'', ['\'`foo bar\'']],
        ['\'foo` bar\'', ['\'foo` bar\'']],
        ['\'foo bar`\'', ['\'foo bar`\'']]
      ].forEach(function(v) {
        t.looseEqual(stoke(v[0]), v[1]);
      });
      t.end();
    });
  });
});

test('double-quoted tokens', function(t) {
  t.test('without nested quotes', function(t) {
    [ ['""', ['""']],
      ['" "', ['" "']],
      ['"  "', ['"  "']],
      ['"foo"', ['"foo"']],
      ['"foo" "bar"', ['"foo"', '"bar"']],
      ['"foo bar"', ['"foo bar"']],
      ['"foo bar" "baz"', ['"foo bar"', '"baz"']],
      ['  " foo bar "  " baz "  ', ['" foo bar "', '" baz "']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('malformed', function(t) {
    [ '"',
      ' "',
      '" ',
      '"""',
      '" ""',
      '"" "',
      '"foo bar',
      'foo" bar',
      'foo "bar',
      'foo bar"'
    ].forEach(function(v) {
      t.throws(function() {
        stoke(v);
      });
    });
    t.end();
  });
  t.test('with nested single-quotes', function(t) {
    [ ['"\'\'"', ['"\'\'"']],
      ['"\' \'"', ['"\' \'"']],
      ['"\'foo\'"', ['"\'foo\'"']],
      ['"\'foo bar\'"', ['"\'foo bar\'"']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ ['"\'"', ['"\'"']],
        ['"\' "', ['"\' "']],
        ['"\'foo"', ['"\'foo"']],
        ['"\'foo bar"', ['"\'foo bar"']],
        ['"foo\' bar"', ['"foo\' bar"']],
        ['"foo bar\'"', ['"foo bar\'"']]
      ].forEach(function(v) {
        t.looseEqual(stoke(v[0]), v[1]);
      });
      t.end();
    });
  });
  t.test('with nested back-quotes', function(t) {
    [ ['"``"', ['"``"']],
      ['"` `"', ['"` `"']],
      ['"`foo`"', ['"`foo`"']],
      ['"`foo bar`"', ['"`foo bar`"']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ '"`"',
        '"` "',
        '"`foo"',
        '"`foo bar"',
        '"foo` bar"',
        '"foo bar`"'
      ].forEach(function(v) {
        t.throws(function() {
          stoke(v);
        });
      });
      t.end();
    });
  });
});

test('back-quoted tokens', function(t) {
  t.test('without nested quotes', function(t) {
    [ ['``', ['``']],
      ['` `', ['` `']],
      ['`  `', ['`  `']],
      ['`foo`', ['`foo`']],
      ['`foo` `bar`', ['`foo`', '`bar`']],
      ['`foo bar`', ['`foo bar`']],
      ['`foo bar` `baz`', ['`foo bar`', '`baz`']],
      ['  ` foo bar `  ` baz `  ', ['` foo bar `', '` baz `']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });
  t.test('malformed', function(t) {
    [ '`',
      ' `',
      '` ',
      '```',
      '` ``',
      '`` `',
      '`foo bar',
      'foo` bar',
      'foo `bar',
      'foo bar`'
    ].forEach(function(v) {
      t.throws(function() {
        stoke(v);
      });
    });
    t.end();
  });
  t.test('with nested single-quotes', function(t) {
    [ ['`\'\'`', ['`\'\'`']],
      ['`\' \'`', ['`\' \'`']],
      ['`\'foo\'`', ['`\'foo\'`']],
      ['`\'foo bar\'`', ['`\'foo bar\'`']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ ['`\'`', ['`\'`']],
        ['`\' `', ['`\' `']],
        ['`\'foo`', ['`\'foo`']],
        ['`\'foo bar`', ['`\'foo bar`']],
        ['`foo\' bar`', ['`foo\' bar`']],
        ['`foo bar\'`', ['`foo bar\'`']]
      ].forEach(function(v) {
        t.throws(function() {
          stoke(v);
        });
      });
      t.end();
    });
  });
  t.test('with nested double-quotes', function(t) {
    [ ['`""`', ['`""`']],
      ['`" "`', ['`" "`']],
      ['`"foo"`', ['`"foo"`']],
      ['`"foo bar"`', ['`"foo bar"`']]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.test('malformed', function(t) {
      [ '`"`',
        '`" `',
        '`"foo`',
        '`"foo bar`',
        '`foo" bar`',
        '`foo bar"`'
      ].forEach(function(v) {
        t.throws(function() {
          stoke(v);
        });
      });
      t.end();
    });
  });
});
