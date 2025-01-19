/* eslint-env node */
'use strict';

module.exports = function(environment) {
  return {
    modulePrefix: 'color',
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
