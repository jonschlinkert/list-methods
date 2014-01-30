
var template = module.exports = {};


template.base = [
  '# <%= data.name %> properties\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '* <%- fn %>\n',
  '<% }); %>'
].join('');


template.docs = [
  '# <%= data.name %> methods\n\n',
  '<% _.forEach(data, function(fn) { %>',
  '# <%- fn %>\n',
  'Type: `undefined`\n\n',
  'Default: `undefined`\n\n',
  '<% }); %>'
].join('');
