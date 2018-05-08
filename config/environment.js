/* eslint-env node */
'use strict';

var contentSecurityPolicy = {
  'connect-src': "'self' https://*.google.com"
};

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'mi-guatemala',
    environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      dataSpreadsheetSourceUrl: '/data-spreadsheet-url',
      configSpreadsheetSourceUrl: '/config-spreadsheet-url',

      // Set null to retrieve data from the spreadsheet live. Otherwhise set the
      // URL from which to load de dumped static files
      // staticFilesUrl: null
      // staticFilesUrl: 'http://eleccionmp.org/static-files/'
    },

    disqus: {
      shortname: 'eleccion-mp'
    },

    contentSecurityPolicy: contentSecurityPolicy
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy['script-src'] = "'self' 'unsafe-eval' db.devservir6:* 172.20.10.9:*";

    ENV.APP.staticFilesUrl = 'http://db.devservir6:6362/static-files/';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = {
      webPropertyId: 'UA-113727052-1'
    };

    ENV.APP.staticFilesUrl = 'http://contralor.redciudadana.org/static-files/';
  }

  return ENV;
};
