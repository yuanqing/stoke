# Stoke.js [![npm Version](http://img.shields.io/npm/v/stoke.svg?style=flat)](https://www.npmjs.org/package/stoke) [![Build Status](https://img.shields.io/travis/yuanqing/stoke.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/stoke) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/stoke.svg?style=flat)](https://coveralls.io/r/yuanqing/stoke) [![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg)]

> Generate the Abstract Syntax Tree of a [Bash](http://www.gnu.org/software/bash/) command.

## Usage

```js
stoke('foo');
/* [
 *   {
 *     type: 'unquoted',
 *     body: 'foo'
 *   }
 * ]
 */

stoke('echo "foo `echo \'bar baz\'`"');
/* [
 *   {
 *     type: 'unquoted',
 *     body: 'echo'
 *   },
 *   {
 *     type: 'double-quoted',
 *     body: [
 *       {
 *         type: 'unquoted',
 *         body: 'foo '
 *       },
 *       {
 *         type: 'back-quoted',
 *         body: [
 *           {
 *             type: 'unquoted',
 *             body: 'echo'
 *           },
 *           {
 *             type: 'single-quoted',
 *             body: 'bar baz'
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */
```

There are [lots of tests](https://github.com/yuanqing/stoke/blob/master/test).

### Grammar

Currently, only a *subset* of the grammar is supported. (For example, Stoke does *not* support escaped quotes.)

The [EBNF](http://en.wikipedia.org/wiki/Extended_Backus-Naur_Form) grammar rules that define a token are as follows:

```
token         = unquoted | single­-quoted | double­-quoted | back-quoted ;
unquoted      = ? [^'"`\s\n] ? ;
single­-quoted = "'" , ? [^'\n] ? , "'" ;
double-­quoted = """ , { unquoted | back-quoted } , """ ;
back-quoted   = "`" , { unquoted | single­-quoted | double­-quoted } , "`" ;
```

## API

### stoke(str)

Parse the given Bash command into an Abstract Syntax Tree (see [Usage](#usage)). Throws if `str` is not a string, or if the Bash command is [malformed](#grammar).

## Installation

Install via [npm](https://npmjs.com/):

```
$ npm i --save stoke
```

## Changelog

- 0.1.0
  - Initial release

## License

[MIT](https://github.com/yuanqing/stoke/blob/master/LICENSE)
