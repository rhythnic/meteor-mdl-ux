Package.describe({
  name: 'rhythnic:mdl-ux',
  version: '0.0.1',
  summary: 'Reactive Templates for Google\'s Material Design Lite',
  git: 'https://github.com/rhythnic/meteor-mdl-ux',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'templating',
    'underscore',
    'reactive-var'
  ], 'client');

  api.addFiles([
    'material.js',
    'material-templates.html',
    'material-templates.js',
    'attributes.js',
    'components/spinner/spinner.html',
    'components/spinner/spinner.js',
    'components/button/button.html',
    'components/button/button.js',
    'components/textfield/textfield.html',
    'components/textfield/textfield.js',
    'components/toggle/toggle.html',
    'components/toggle/toggle.js'
  ], 'client');
  api.export('Material', 'client');
});

Package.onTest(function(api) {
  api.use(['jquery', 'tinytest', 'rhythnic:mdl-ux'], 'client');
  api.addFiles('mdl-ux-tests.js', 'client');
});
