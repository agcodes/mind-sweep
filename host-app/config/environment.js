'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'host-app',
    environment,
    rootURL: '/mind-sweep/',
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
    // Ajout des variables globales
    APP: {
      SITE_TITLE: 'Mind sweep',
      VARS: {
        SITE_TITLE: 'Mind sweep',
        DEVIANT_ART_URL: '',
        API_POSTS_URL: ''
      }
    },
    intl: {
      defaultLocale: 'en-us',
      availableLocales: ['en-us', 'fr-fr']
    },
    engines: {
      curve: {
        dependencies: {
          services: ['intl'] // Partagez le service `intl` avec l'Engine
        }
      },
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  console.info("environment", environment);

  if (environment === 'development') {
    //ENV.APP.VARS.API_POSTS_URL = 'http://localhost:4200/api/mastodon/sample.json';
    //ENV.APP.VARS.DEVIANT_ART_URL = 'http://localhost:4200/api/deviant/sample.xml';

    ENV.APP.VARS.API_POSTS_URL = 'https://en-revant.fr/mastodon.json';
    ENV.APP.VARS.DEVIANT_ART_URL = 'https://backend.deviantart.com/rss.xml?q=gallery:universlogique';
  }
  else {
    ENV.APP.VARS.API_POSTS_URL = 'https://en-revant.fr/mastodon.json';
    ENV.APP.VARS.DEVIANT_ART_URL = 'https://backend.deviantart.com/rss.xml?q=gallery:universlogique';
  }

  return ENV;
};
