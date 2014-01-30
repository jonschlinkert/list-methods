/**
 * list-functions
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';


var path = require('path');
var chalk = require('chalk');
var file = require('fs-utils');
var _ = require('lodash');

var success = chalk.green;

var functions = module.exports = function(src, options) {
  var opts = _.extend({}, options);
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

  var fn = _.functions(source);
  return _.extend(fn, {name: name});
};


functions.writeFile = function(dest, src, options) {
  var opts = _.extend({}, options);
  var data = functions(src, opts);
  var tmpl;

  // Custom template? If so, try to require it first
  try { tmpl = require(opts.template); } catch(e) {
    tmpl = opts.template || require('./lib/template').base;
  }
  var output = _.template(tmpl, {data: data});
  file.writeFileSync(dest, output);
  console.log(success('>> File written to'), dest, success('OK'));
};


functions.writeData = function(dest, src, options) {
  var opts = _.extend({}, options);
  var data = functions(src, opts);
  file.writeDataSync(dest, data);
  console.log(success('>> File written to'), dest, success('OK'));
};
