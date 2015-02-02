'use strict';

var stoke = require('../');

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
