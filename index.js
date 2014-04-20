/**
 * list-methods
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

const path     = require('path');
const file     = require('fs-utils');
const template = require('template');
const log      = require('verbalize');
const _        = require('lodash');


// Default template to use.
var templates = require('./lib/template');


/**
 * Expose `methods`
 *
 * @param   {String} The file to read.
 *
 * @return  {Object} Methods and source filename.
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

  var fn = _.methods(source);
  return _.extend(fn, {name: name});
};


/**
 * Write file as string.
 *
 * @param   {String}  dest
 * @param   {String}  src
 * @param   {String}  options
 *
 * @return  {String}
 * @api public
 */

methods.writeFile = function(dest, src, options) {
  var opts = _.extend({template: templates.docs}, options);

  var data = methods(src);
  var output = template(opts.template, _.extend({data: data}, opts));

  file.writeFileSync(dest, output);
  log.subhead('writing', dest);
};


/**
 * Write file as data, either JSON or YAML
 *
 * @param   {String}  dest
 * @param   {String}  src
 *
 * @return  {String}
 * @api public
 */

methods.writeDataFile = function(dest, src) {
  log.subhead('reading', src);
  var data = methods(src);

  file.writeDataSync(dest, data);
  log.subhead('writing', dest);
};
