'use strict';

var BACK_QUOTE = '`';
var SINGLE_QUOTE = '\'';
var DOUBLE_QUOTE = '"';
var SPACE = ' ';

var stoke = function(str) {

  if (typeof str !== 'string') {
    throw new Error('expects a string');
  }

  var len = str.length;
  var i = 0;
  var quoteDepth = 0;
  var result = [];

  var parse = {};

  parse[DOUBLE_QUOTE] = function(parent) {
    var body = [];
    var stop = false;
    while (!stop && i < len) {
      var c = str[i++];
      switch (c) {
      case DOUBLE_QUOTE:
        quoteDepth--;
        stop = true;
        break;
      case BACK_QUOTE:
        quoteDepth++;
        parse[BACK_QUOTE](body);
        break;
      default:
        parseUnquoted(body, [DOUBLE_QUOTE, BACK_QUOTE]);
      }
    }
    parent.push({
      type: 'double-quoted',
      body: body
    });
  };

  parse[SINGLE_QUOTE] = function(parent) {
    var token = [];
    while (i < len) {
      var c = str[i++];
      if (c === SINGLE_QUOTE) {
        quoteDepth--;
        break;
      }
      token.push(c);
    }
    parent.push({
      type: 'single-quoted',
      body: token.join('')
    });
  };

  parse[BACK_QUOTE] = function(parent) {
    var body = [];
    var stop = false;
    while (!stop && i < len) {
      var c = str[i++];
      switch (c) {
      case BACK_QUOTE:
        quoteDepth--;
        stop = true;
        break;
      case SINGLE_QUOTE:
      case DOUBLE_QUOTE:
        quoteDepth++;
        parse[c](body);
        break;
      case SPACE:
        break;
      default:
        parseUnquoted(body, [SPACE, SINGLE_QUOTE, DOUBLE_QUOTE, BACK_QUOTE]);
      }
    }
    parent.push({
      type: 'back-quoted',
      body: body
    });
  };

  var parseUnquoted = function(parent, terminators) {
    i--;
    var token = []; // for accumulating characters
    while (i < len) {
      var c = str[i];
      if (terminators.indexOf(c) !== -1) {
        break;
      }
      i++;
      token.push(c);
    }
    parent.push({
      type: 'unquoted',
      body: token.join('')
    });
  };

  while (i < len) {
    var c = str[i++];
    switch (c) {
    case SINGLE_QUOTE:
    case DOUBLE_QUOTE:
    case BACK_QUOTE:
      quoteDepth++;
      parse[c](result);
      break;
    case SPACE:
      break;
    default:
      parseUnquoted(result, [SPACE, SINGLE_QUOTE, DOUBLE_QUOTE, BACK_QUOTE]);
    }
  }

  if (quoteDepth !== 0) {
    throw new Error('malformed: ' + (i-1));
  }

  return result;

};

module.exports = stoke;
