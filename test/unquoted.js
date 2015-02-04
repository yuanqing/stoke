'use strict';

var test = require('tape');
var stoke = require('../');

test('without operators', function(t) {
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

test('with operators', function(t) {

  t.test('bare operators', function(t) {
    [
      [
        '<', [
          { type: 'unquoted', body: '<' }
        ]
      ],
      [
        '>', [
          { type: 'unquoted', body: '>' }
        ]
      ],
      [
        '|', [
          { type: 'unquoted', body: '|' }
        ]
      ],
      [
        ';', [
          { type: 'unquoted', body: ';' }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });

  t.test('operators between tokens', function(t) {
    [
      [
        'foo < bar > baz | bim ; bam', [
          { type: 'unquoted', body: 'foo' },
          { type: 'unquoted', body: '<' },
          { type: 'unquoted', body: 'bar' },
          { type: 'unquoted', body: '>' },
          { type: 'unquoted', body: 'baz' },
          { type: 'unquoted', body: '|' },
          { type: 'unquoted', body: 'bim' },
          { type: 'unquoted', body: ';' },
          { type: 'unquoted', body: 'bam' }
        ]
      ],
      [
        'foo<bar>baz|bim;bam', [
          { type: 'unquoted', body: 'foo' },
          { type: 'unquoted', body: '<' },
          { type: 'unquoted', body: 'bar' },
          { type: 'unquoted', body: '>' },
          { type: 'unquoted', body: 'baz' },
          { type: 'unquoted', body: '|' },
          { type: 'unquoted', body: 'bim' },
          { type: 'unquoted', body: ';' },
          { type: 'unquoted', body: 'bam' }
        ]
      ]
    ].forEach(function(v) {
      t.looseEqual(stoke(v[0]), v[1]);
    });
    t.end();
  });

});
