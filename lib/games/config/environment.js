/* eslint-env node */
'use strict';

module.exports = function(environment) {
  return {
    modulePrefix: 'games',
    lazyLoading: {
      enabled: true
    },
    dependencies: {
      services: [
      ]
    },
    environment
  };
};
