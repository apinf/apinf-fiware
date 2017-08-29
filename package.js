Package.describe({
  name: 'apinf:fiware',
  version: '0.1.0',
  summary: 'OAuth handler for FIWARE IdM',
  git: 'https://github.com/apinf/apinf-fiware',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('accounts-ui', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');

  api.export('Fiware');

  api.addFiles(
    ['fiware_configure.html', 'fiware_configure.js'],
    'client');

  api.addFiles('fiware_server.js', 'server');
  api.addFiles('fiware_client.js', 'client');
});

Npm.depends({
  'nock': '9.0.14'
});

Package.onTest(function(api) {
  api.versionsFrom('1.2.1');
  api.use('ecmascript');
  api.use('accounts-ui', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use(['random', 'templating'], 'client');
  api.use('practicalmeteor:mocha');

  api.export('Fiware');

  api.addFiles(
    ['fiware_configure.html', 'fiware_configure.js'],
    'client');

  api.addFiles('fiware_server.js', 'server');
  // api.addFiles('fiware_client.js', 'client');
  api.addFiles('tests/config.test.js', 'server');
  api.addFiles('tests/fiware_server.test.js', 'server');
  api.addFiles('tests/fiware_client.test.js', 'client');
});
