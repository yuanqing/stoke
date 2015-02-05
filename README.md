# Stoke.js [![npm Version](http://img.shields.io/npm/v/stoke.svg?style=flat)](https://www.npmjs.org/package/stoke) [![Build Status](https://img.shields.io/travis/yuanqing/stoke.svg?branch=master&style=flat)](https://travis-ci.org/yuanqing/stoke) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/stoke.svg?style=flat)](https://coveralls.io/r/yuanqing/stoke) ![Stability Experimental](http://img.shields.io/badge/stability-experimental-red.svg?style=flat)

> Generate the Abstract Syntax Tree (AST) of a [Bash](http://www.gnu.org/software/bash/) command.

- Tokenise a given command based on a subset of Bash&rsquo;s quoting rules
- Detect malformed commands
- [Extensive tests](https://github.com/yuanqing/stoke/blob/master/test), with [100% coverage](https://coveralls.io/r/yuanqing/stoke)

## Why

This was written mainly:

1. As an exercise in writing a parser based on strict grammar rules
2. As part of a larger project to build a Bash shell from the ground up

## Usage

```js
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

[Read the tests](https://github.com/yuanqing/stoke/blob/master/test) for more usage examples.

### Grammar

The granularity of the AST is at the *token* level. Tokenisation is based on a subset of [Bash&rsquo;s quoting rules](https://www.gnu.org/software/bash/manual/html_node/Quoting.html). This particular subset of the grammar (specified in [EBNF](http://en.wikipedia.org/wiki/Extended_Backus-Naur_Form)) is as follows:

<pre>
token         = unquoted | single­-quoted | double­-quoted | back-quoted ;
unquoted      = ? /[^'"` ]+/ ? ;
single­-quoted = &ldquo;'&rdquo; , ? /[^']+/ ? , &ldquo;'&rdquo; ;
double-­quoted = &ldquo;"&rdquo; , { unquoted | back-quoted } , &ldquo;"&rdquo; ;
back-quoted   = &ldquo;`&rdquo; , { unquoted | single­-quoted | double­-quoted } , &ldquo;`&rdquo; ;
</pre>

(Currently, Stoke does *not* support escape sequences. For example, you currently cannot escape a double-quote character when inside a double-quote block.)

Stoke will throw an error if a given command does not conform to the above grammar rules.

## API

### stoke(str)

See [Usage](#usage).

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
