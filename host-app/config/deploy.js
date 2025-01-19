'use strict';
// config/deploy.js
// config/deploy.js
module.exports = function (deployTarget) {
  let ENV = {
    build: {
      environment: deployTarget === 'production' ? 'production' : 'development',
    },
    githubPages: {
      app: 'mind-sweep',  // Name of your GitHub Pages repository
      branch: 'gh-pages', // Branch where the site will be deployed
      distDir: 'dist',    // The directory containing the built files
    },
  };

  if (deployTarget === 'production') {
    // Add production-specific settings here
    ENV.build.environment = 'production';
    ENV.githubPages.branch = 'gh-pages';
  }

  return ENV;
};
