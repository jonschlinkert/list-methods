# list-methods [![NPM version](https://badge.fury.io/js/list-methods.png)](http://badge.fury.io/js/list-methods)

> Kickstart the API documentation for your node lib! Generate a list of all the methods on an object, formatted as markdown, JSON or YAML.

More specifically, `methods` generates a JSON or markdown list (sorted array) of property names of all enumerable properties,
own and inherited, of objects that have function values.


## Quickstart
{%= docs("install") %}


## Arguments

```bash
methods [src] [dest] [template]
```
* `src` [String]: The name of the file or npm module for which to list methods
* `dest` [String]: (optional) The destination file. Specify a file with a valid extension (`.md` or `.yml`) and the file will automatically be saved with the correct format.
* `template` [String]: (optional) The template to use for the generated list. See [the default](./lib/template.js), or the [example](#custom-templates) below.

Example:

```bash
methods index.js docs/api.yml
```

## Usage

### src

Type: `String` (optional)

Default: `index.js` (if `index.js` is not found, searches for a `.js` file in the immediate directory)

```js
methods [src]
```

The first argument is the target source file or npm module. For example, `methods foo` will generate markdown file named `foo.md` in the current directory.

Either of the following will work:

```bash
// local lib
methods path/to/foo.js

// npm module
methods my_npm_module
```

### src and dest

```js
methods [src] [dest]
```

The second argument is the destination path. For example, `methods foo docs.md` will generate markdown file named `docs.md` in the current directory. _Also note that the destination path is "extension-sensitive", meaning that if a `.yml` or `.json` extensions are used, the generated file will be formatted in YAML or JSON instead of markdown._


### src, dest and template

```js
methods [src] [dest] [template]
```

The third argument is the [template to use](./lib/templates.js). By default, a [simple markdown list](#basic-list) is generated. Additional templates are:

* `docs`
* `yaml`

See [templates](#templates) for additional options.


## Templates

See [examples](./examples/) of generated files.

### base

The `base` template does not need to be specified and will generate a simple, markdown-formatted list of methods.

Try running `methods lodash` in the command line (assuming [Lo-Dash](http://lodash.com/) is already installed locally). If successful, a markdown file, `lodash.md`, will have been saved to the current directory, and inside will be something like:

![image](https://f.cloud.github.com/assets/383994/2119396/14b0692e-9164-11e3-8184-44d9a3f1429f.png)

If the destination path ends in a `.json` file extension, a JSON file will be generated instead, e.g.:

![image](https://f.cloud.github.com/assets/383994/2119401/5757f512-9164-11e3-999b-d1458bf7cbb4.png)


### docs

The `docs` template, specified with `methods lodash lodash.md docs`, will generate a markdown-formatted "starter" file for documentation. Using the Lo-Dash example from the last section, the resuls would look something like this:

![image](https://f.cloud.github.com/assets/383994/2119395/f99ea0a6-9163-11e3-9fec-7e341aa8aaf4.png)

### yaml

Like the other templates, the `yaml` template is specified as a fourth paramter. Also, this template will automatically be used if the destination file path ends in a `.yml` extension.

The output for the Lo-Dash example would look something like:

![image](https://f.cloud.github.com/assets/383994/2119399/2dc3a778-9164-11e3-83d3-a590e192db56.png)


## Custom templates

Easily customize the output by creating a custom template. The template can either be a local file or npm module. Like the included templates, custom templates should also be specified as a fourth parameter.

For example, to use `my-custom-template.js`, you would enter the following in the command line:

```bash
methods lodash lodash.md my_custom_template.js
```
Or if `my-template` is in node_modules:

```bash
methods lodash lodash.md my_custom_template
```

### Example template

These are just Lo-Dash templates, keeping in mind that the only context passed into the templates is the array of properties generated.

```js
module.exports = [
  '# <%= data.name %> properties\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '* <%- fn %>\n',
  '<% }); %>'
].join('');
```

## Author

**Jon Schlinkert**

+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2014 [Jon Schlinkert](http://twitter.com/jonschlinkert), [Brian Woodward](http://twitter.com/doowb), contributors.
Released under the [MIT license](./LICENSE-MIT)