Package.describe({
  name: 'rhythnic:mdl-ux',
  version: '0.0.4',
  summary: 'Reactive Templates for Google\'s Material Design Lite',
  git: 'https://github.com/rhythnic/meteor-mdl-ux',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'templating',
    'underscore',
    'reactive-var',
    'reactive-dict'
  ], 'client');

  api.addFiles([
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
    'components/toggle/toggle.js',
    'components/modal/modal.html',
    'components/modal/modal.js',
    'components/modal/modal.css'
  ], 'client');
  api.export('MDL');
});

Package.onTest(function(api) {
  api.use(['jquery', 'tinytest', 'rhythnic:mdl-ux'], 'client');
  api.addFiles('mdl-ux-tests.js', 'client');
});
