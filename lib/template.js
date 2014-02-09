const path = require('path');
const file = require('fs-utils');


var template = module.exports = {};

template.base = [
  '# <%= data.name %> properties\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '* <%- fn %>\n',
  '<% }); %>'
].join('');


template.docs = [
  '# <%= data.name %>\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '## API\n\n',
  '### <%- fn %>\n',
  'Type: `undefined`\n\n',
  'Default: `undefined`\n\n',
  '<% }); %>'
].join('');


template.yaml = file.readFileSync(path.resolve(__dirname, './template.yaml'));