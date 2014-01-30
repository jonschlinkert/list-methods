# list-methods [![NPM version](https://badge.fury.io/js/list-methods.png)](http://badge.fury.io/js/list-methods)

> Easily generate a JSON or markdown list (sorted array) of property names of all enumerable properties, own and inherited, of objects that have function values.


## Quickstart

To install with [npm](), in the command line run:

```bash
npm i -g list-methods
```

Now, anytime you want to list the methods in a file or npm module, run the following in the command line:

```
// local lib
methods path/to/foo.js

// npm module
methods foo
```

## Params

```js
methods [src] [dest] [template]
```
* `src` [String]: (require) The name of the file or npm module for which to list methods
* `dest` [String]: (optional) The destination file. Specify a file with a valid extension (`.md`, `.json` or `.yml`) and the file will automatically be saved with the correct format.
* `template` [String]: (optional) The template to use for the generated list. See [the default](./lib/template.js), or the [example](#custom-templates) below.


## Usage
Only the `src` (target file or npm module) is required. If no other arguments are passed, upon entering the `methods foo` command a markdown file (`foo.md`) will be generated in the same directory.

### Basic list

To list the methods from, say Lo-Dash, in the command line run:

```js
methods lodash
```
and a markdown file, `lodash.md`, will be saved in the same directory, containing a list of all the properties on the Lo-Dash object. e.g. something like:

```markdown
# lodash properties

* _
* after
* all
* any
* assign
* at
* bind
* bindAll
* bindKey
* chain
etc...

```

### Specify dest file

Optionally specify a destination:

```bash
methods lodash "tmp/lodash.md"
```

#### JSON/YAML format

JSON or YAML will automatically be generated if the destination file extension ends in `.json` or `.yml`. e.g.:

```js
[
  "_",
  "after",
  "all",
  "any",
  "assign",
  "at",
  "bind",
  ...
]
```

## Templates

Only two templates are included by default. The `base` template, which generates a simple list and does not need to be specified, and the `docs` template, which can be specified as a fourth parameter, e.g. `methods lodash lodash.md docs`.

The output would look something like:

```markdown
# lodash methods

# _
Type: `undefined`

Default: `undefined`

# after
Type: `undefined`

Default: `undefined`

# all
Type: `undefined`

Default: `undefined`

# any
Type: `undefined`

Default: `undefined`

# assign
Type: `undefined`

Default: `undefined`

# at
Type: `undefined`

Default: `undefined`

etc...

```

## Custom templates

Easily customize the output by creating a custom template. The template can either be a local file or npm module and, like the `docs` template, should be specified as a fourth parameter.

For example, to use `my-template.js`, you would enter the following in the command line:

```bash
methods lodash lodash.md my-template.js
```
Or if `my-template` is a npm module:

```bash
methods lodash lodash.md my-template
```

### Template example

Lo-Dash templates are used to generate the output, and the only context passed into the templates is the array of properties generated.

```js
module.exports = [
  '# <%= data.name %> properties\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '* <%- fn %>\n',
  '<% }); %>'
].join('');
```

## Authors

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 [Jon Schlinkert](http://twitter.com/jonschlinkert), [Brian Woodward](http://twitter.com/doowb), contributors.
Released under the [MIT license](./LICENSE-MIT)