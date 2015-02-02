'use strict';

var test = require('tape');
var stoke = require('../');

test('no nested quotes', function(t) {

  t.test('single token', function(t) {

    [
      [
        '\'\'', [
          {
            type: 'single-quoted',
            body: []
          }
        ]
      ],
      [
        '\' \'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: ' ' }]
          }
        ]
      ],
      [
        '\'  \'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '  ' }]
          }
        ]
      ],
      [
        '\'foo\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'foo' }]
          }
        ]
      ],
      [
        ' \'foo\' ', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'foo' }]
          }
        ]
      ],
      [
        '\' foo \'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: ' foo ' }]
          }
        ]
      ],
      [
        ' \' foo \' ', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: ' foo ' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // single token

  t.test('multiple tokens', function(t) {

    [
      [
        '\'foo\'\'bar\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'foo' }]
          },
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'bar' }]
          }
        ]
      ],
      [
        ' \' foo \' \' bar \' ', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: ' foo ' }]
          },
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: ' bar ' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // multiple tokens

}); // no nested quotes

test('nested double-quotes', function(t) {

  t.test('valid', function(t) {

    [
      [
        '\'""\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '""' }]
          }
        ]
      ],
      [
        '\'" "\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '" "' }]
          }
        ]
      ],
      [
        '\'"foo"\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '"foo"' }]
          }
        ]
      ],
      [
        '\'"foo bar"\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '"foo bar"' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // valid

  t.test('malformed', function(t) {

    [
      '\'"',
      '\'" ',
      '\'"foo',
      '\'foo bar"',
    ].forEach(function(str) {
      t.throws(function() {
        stoke(str);
      });
    });

    [
      [
        '\'"\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '"' }]
          }
        ]
      ],
      [
        '\'" \'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '" ' }]
          }
        ]
      ],
      [
        '\'"foo\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '"foo' }]
          }
        ]
      ],
      [
        '\'foo bar"\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'foo bar"' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // malformed

}); // nested double-quotes

test('nested back-quotes', function(t) {

  t.test('valid', function(t) {

    [
      [
        '\'``\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '``' }]
          }
        ]
      ],
      [
        '\'` `\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '` `' }]
          }
        ]
      ],
      [
        '\'`foo`\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '`foo`' }]
          }
        ]
      ],
      [
        '\'`foo bar`\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '`foo bar`' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // valid

  t.test('malformed', function(t) {

    [
      '\'`',
      '\'` ',
      '\'`foo',
      '\'foo bar`',
    ].forEach(function(str) {
      t.throws(function() {
        stoke(str);
      });
    });

    [
      [
        '\'`\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '`' }]
          }
        ]
      ],
      [
        '\'` \'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '` ' }]
          }
        ]
      ],
      [
        '\'`foo\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: '`foo' }]
          }
        ]
      ],
      [
        '\'foo bar`\'', [
          {
            type: 'single-quoted',
            body: [{ type: 'unquoted', body: 'foo bar`' }]
          }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();

  }); // malformed

}); // nested back-quotes

test('malformed', function(t) {

  [ '\'',
    '\' ',
    ' \'',
    ' \' ',
    '\'foo',
    '\' foo',
    ' \'foo',
    ' \' foo',
    'foo\'bar',
    'foo \' bar',
    'foo\'',
    'foo \'',
    'foo\' ',
    'foo \' ',
    '\'\'\''
  ].forEach(function(str) {
    t.throws(function() {
      stoke(str);
    });
  });
  t.end();

}); // malformed
