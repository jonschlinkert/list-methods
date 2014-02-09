/**
 * list-methods
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */
// Node.js
const path  = require('path');

// node_modules
const chalk    = require('chalk');
const file     = require('fs-utils');
const template = require('template');
const _        = require('lodash');


var success = chalk.green;
var templates = require('./lib/template');

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

methods.writeFile = function(dest, src, options) {
  var opts = _.extend({template: templates.docs}, options);
  var data = methods(src);
  var output = template(opts.template, _.extend({data: data}, opts));
  file.writeFileSync(dest, output);
  console.log(success('>> File written to'), dest, success('OK'));
};

methods.writeDataFile = function(dest, src) {
  var data = methods(src);
  file.writeDataSync(dest, data);
  console.log(success('>> File written to'), dest, success('OK'));
};
