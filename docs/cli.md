Run the `methods` command without any arguments and a markdown file will be generated for `index.js`, or the first javascript file found in the current directory.

### args

If you want to specify the source file to read, or the destination to write to, you can use this format:

```bash
methods [src] [dest]
```

Or:

* `-s` | `--src`: reads the specified source file
* `-d` | `--dest`: the destination path and file to write. note that _extension is significant_

Dest extension:

* `.yml`: generates a YAML file
* `.md`: generates a markdown file

### template

Methods uses Lo-Dash templates, so they're super fast and easy to extend. There are a couple of ways you can specify the template to use.

Either as a third argument:

```bash
methods [src] [dest] [template]
```

Or with `-t` or `--template`:

```bash
methods -t docs
```

#### built-in templates

There are three built-in templates:

* `list`: generates a simple, bullet list of methods
* `docs`: generates a formatted markdown file, giving each method its own section with starter content for `type` and `default`, etc.
* `yaml`: similar to docs, but outputs YAML. this is useful if you want to update and extend this file with other tools, like [Verb](https://github.com/assemble/verb) or [Assemble](https://github.com/assemble/assemble)

#### custom templates

The only context passed to the templates is the array of properties generated. Example:

```js
module.exports = [
  '# <%= data.name %> properties\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '* <%- fn %>\n',
  '<% }); %>'
].join('');
```

You can either specify the filepath to the custom template, or the name of a npm module that is installed locally, and methods will try to use it:

```bash
methods -t my-template
```
