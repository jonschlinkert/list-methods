var template = module.exports = {};

template.base = [
  '<% _.forEach(data, function(fn) { %>',
  '* <%= fn %>\n',
  '<% }); %>'
].join('');

// Alias for `base`
template.list = template.base;

template.docs = [
  '<% _.forEach(data, function(fn) { %>',
  '### <%= fn %>\n',
  'Type: `_nothing yet_`\n\n',
  'Default: `_nothing yet_`\n\n',
  '<% }); %>'
].join('');


template.yaml = [
  '# =============================================',
  '# API methods for <%= data.name %>',
  '# =============================================',
  '<% _.forEach(data, function(fn) { %>',
  '<%- fn %>:',
  '  type:        _nothing yet_',
  '  default:     _nothing yet_',
  '  description: _nothing yet_',
  '  example:     _nothing yet_',
  '<% }); %>'
].join('\n');