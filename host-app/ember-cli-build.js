'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const path = require('path');

module.exports = function (defaults) {
  const env = EmberApp.env();
  console.info("build env", env);

  const modeBuild = process.env.MODE_BUILD || 'dev';
  console.info("mode build", modeBuild);

  const isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1 || modeBuild === "prod";

  console.info("isProductionLikeBuild", isProductionLikeBuild);

  const app = new EmberApp(defaults, {
    // Add options here
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },
    'esw-asset-cache': {
      version: '1', // Version de votre cache
      include: [
        'assets/**/*', // Inclure tous les actifs dans le cache
        'index.html',
      ]
    },
    // Autres options de configuration
    liveReload: {
      enabled: !isProductionLikeBuild,
      paths: [
        // Ajoutez les chemins des addons internes si nécessaire
      ]
    },
    // Add options here
    'ember-cli-terser': {
      enabled: isProductionLikeBuild,
      exclude: ['vendor.js', '_three.min.js'],
      terser: {
        compress: {
          sequences: 50,
        },
        output: {
          semicolons: true,
        },
      },
      hiddenSourceMap: isProductionLikeBuild
    },
    minifyCSS: {
      enabled: isProductionLikeBuild
    },
    minifyJS: {
      enabled: isProductionLikeBuild
    },
    fingerprint: {
      enabled: isProductionLikeBuild,
      generateAssetMap: true,
      prepend: '',
      fingerprintAssetMap: isProductionLikeBuild,
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map']
    },
    // GitHub Pages base URL setup
    baseURL: '/mind-sweep/'
  });

  // Add the deploy pipeline
  app.registry.add('deploy', require('ember-cli-deploy-github-pages'));
  app.import('node_modules/popper.js/dist/umd/popper.min.js');
  app.import('node_modules/bootstrap/dist/js/bootstrap.min.js');
  const appTree = app.toTree();


  // Funnel out specific addons
  const specificAddonTrees = [
    // Example: Funnel out fractals-lib
    new Funnel(path.join('/home/ag/dev/universlogique/node_modules', 'fractals-lib'), {
      srcDir: '/',
      include: ['**/*.js'],
      destDir: '/assets/fractals-lib'
    })
    // Repeat the above block for each addon you want to separate
  ];

  // Merge all the trees together
  const finalTree = new MergeTrees([appTree, ...specificAddonTrees], {
    overwrite: true
  });

  return finalTree;
};
