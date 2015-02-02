'use strict';

var BACK_QUOTE = '`';
var SINGLE_QUOTE = '\'';
var DOUBLE_QUOTE = '"';
var SPACE = ' ';

var stoke = function(str) {

  if (typeof str !== 'string') {
    throw new Error('need a string');
  }

  var len = str.length;
  var i = 0;
  var inQuotes = false;
  var result = [];

  var parse = {};

  parse[DOUBLE_QUOTE] = function(parent) {
    var body = [];
    var stop = false;
    while (!stop && i < len) {
      var c = str[i++];
      switch (c) {
      case DOUBLE_QUOTE:
        inQuotes = false;
        stop = true;
        break;
      case BACK_QUOTE:
        parse[BACK_QUOTE](body);
        break;
      default:
        i--;
        parseUnquoted(body, [DOUBLE_QUOTE, BACK_QUOTE]);
      }
    }
    parent.push({
      type: 'double-quoted',
      body: body
    });
  };

  parse[SINGLE_QUOTE] = function(parent) {
    var body = [];
    while (i < len) {
      var c = str[i];
      if (c === SINGLE_QUOTE) {
        i++; // skip over the closing '
        inQuotes = false;
        break;
      }
      parseUnquoted(body, [SINGLE_QUOTE]);
    }
    parent.push({
      type: 'single-quoted',
      body: body
    });
  };

  parse[BACK_QUOTE] = function(parent) {
    var body = [];
    while (i < len) {
      var c = str[i];
      switch (c) {
      case BACK_QUOTE:
      case SPACE:
      case DOUBLE_QUOTE:
      case SINGLE_QUOTE:
        i++;
      }
      if (c === BACK_QUOTE) {
        inQuotes = false;
        break;
      }
      if (c === DOUBLE_QUOTE) {
        parse[DOUBLE_QUOTE](body);
      } else if (c === SINGLE_QUOTE) {
        parse[SINGLE_QUOTE](body);
      } else {
        parseUnquoted(body, [SPACE, SINGLE_QUOTE, DOUBLE_QUOTE, BACK_QUOTE]);
      }
    }
    parent.push({
      type: 'back-quoted',
      body: body
    });
  };

  var parseUnquoted = function(parent, terminators) {
    var token = []; // for accumulating characters
    while (i < len) {
      var c = str[i];
      if (terminators.indexOf(c) !== -1) {
        break;
      }
      i++;
      token.push(c);
    }
    if (token.length) {
      parent.push({
        type: 'unquoted',
        body: token.join('')
      });
    }
  };

  while (i < len) {
    var c = str[i];
    if (c === SPACE) {
      i++; // skip over the space
    } else if (c in parse) {
      i++; // skip over the opening " ' or `
      inQuotes = true;
      parse[c](result);
    } else {
      parseUnquoted(result, [SPACE, SINGLE_QUOTE, DOUBLE_QUOTE, BACK_QUOTE]);
    }
  }

  if (inQuotes) {
    throw new Error('malformed: ' + (i-1));
  }

  return result;

};

module.exports = stoke;
