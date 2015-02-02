'use strict';

var SPACE = ' ';
var BACK = '`';
var SINGLE = '\'';
var DOUBLE = '"';

var stoke = function(str) {

  if (typeof str !== 'string') {
    throw new Error('need a string');
  }

  var len = str.length;
  var token = []; // array for accumulating characters
  var result = [];
  var i = 0;

  var inQuotes = false;

  var parse = {};

  parse[DOUBLE] = function(inBackQuote) {
    while (i < len) {
      var c = str[i++];
      token.push(c);
      switch (c) {
      case DOUBLE:
        inQuotes = false;
        return;
      case BACK:
        if (inBackQuote) {
          throw new Error('malformed: ' + (i - 1));
        }
        parse[BACK]();
      }
    }
  };

  parse[SINGLE] = function() {
    while (i < len) {
      var c = str[i++];
      token.push(c);
      if (c === SINGLE) {
        inQuotes = false;
        return;
      }
    }
  };

  parse[BACK] = function() {
    while (i < len) {
      var c = str[i++];
      token.push(c);
      switch (c) {
      case DOUBLE:
        parse[DOUBLE](true); // cannot have eg. `"`foo`"`
        break;
      case BACK:
        inQuotes = false;
        return;
      }
    }
  };

  var parseBare = function() {
    while (i < len) {
      var c = str[i];
      if (c in parse) {
        return;
      }
      i++;
      if (c === SPACE) {
        return;
      }
      token.push(c);
    }
  };

  while (i < len) {
    var c = str[i++];
    token.push(c);
    if (c in parse) {
      inQuotes = true;
      parse[c]();
    } else {
      parseBare();
    }
    if (inQuotes) {
      throw new Error('malformed: ' + (i-1));
    }
    token = token.join('').trim();
    if (token) {
      result.push(token);
    }
    token = [];
  }

  return result;

};

module.exports = stoke;
