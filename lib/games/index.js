/* eslint-env node */
'use strict';

const EngineAddon = require('ember-engines/lib/engine-addon');

module.exports = EngineAddon.extend({
  name: 'games',
  lazyLoading: {
    enabled: true
  },

  isDevelopingAddon() {
    return true;
  }
})
