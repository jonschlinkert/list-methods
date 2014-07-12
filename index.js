/**
 * list-methods <https://github.com/jonschlinkert/list-methods>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path      = require('path');
var file      = require('fs-utils');
var template  = require('template');
var log       = require('verbalize');
var extend    = require('xtend');
var functions = require('method-names');


// Default template to use.
var templates = require('./lib/template');


/**
 * ## methods
 *
 * @param   {String} `src` The file to read.
 * @return  {Object} Returns an object with the source file `name` and the array of `methods`.
 * @api public
 */

var methods = module.exports = function(src) {
  var name = file.base(src);
  var source;

  try {
    source = require(src);
  } catch(e) {
    try {
      src = path.resolve(process.cwd(), src);
      source = require(src);
    } catch(e) {}
  }
  return {
    name: name,
    methods: functions(source)
  };
};


/**
 * ## .writeFile
 *
 * As a way of kickstarting documentation, this writes the list of methods
 * to a text file. Lodash templates are used to generate the file, so the
 * output is completely customizable.
 *
 * **Example**:
 *
 * ```js
 * methods.writeFile('api.md', 'index.js');
 * // generates a file, "api.md", using a template in lib/templates.js
 * ```
 *
 * **Params:**
 *
 * @param   {String} `dest`
 * @param   {String} `src`
 * @param   {String} `options`
 *   @option {String} `template` Optionally specify a template to use.
 * @return  {String}
 * @api public
 */

methods.writeFile = function(dest, src, options) {
  var opts = extend({template: templates.docs}, options);

  var data = methods(src);
  var output = template(opts.template, extend({data: data}, opts));

  file.writeFileSync(dest, output);
  log.subhead('writing', dest);
};


/**
 * ## .writeDataFile
 *
 * Generate a JSON or YAML file from the list of methods. Automatically detects the
 * format to use based on the given file extension.
 *
 * **Examples**:
 *
 * ```js
 * methods.writeDataFile('api.yml', 'index.js');
 * // generates a YAML file, "api.yml" using a template in lib/templates.js
 *
 * methods.writeDataFile('api.json', 'index.js');
 * // generates a JSON file, "api.json" using a template in lib/templates.js
 * ```
 *
 * **Params:**
 *
 * @param   {String} `dest`
 * @param   {String} `src`
 * @return  {String}
 * @api public
 */

methods.writeDataFile = function(dest, src) {
  log.subhead('reading', src);
  var data = methods(src);

  file.writeDataSync(dest, data);
  log.subhead('writing', dest);
};
