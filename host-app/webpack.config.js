const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'public/assets/js/newton-fractal-wrk.js'),
  output: {
    filename: 'newton-fractal-worker.bundle.js', // Le fichier de sortie
    path: path.resolve(__dirname, 'public/assets/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  esmodules: true,
                },
              }],
            ],
            plugins: [
              ['module-resolver', {
                alias: {
                  '^\\./(.*)$': './\\1.js',
                },
              }],
              ['@babel/plugin-transform-classes', { loose: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }]
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'], // Extensions à ajouter automatiquement
  },
  target: 'webworker', // Spécifie que la cible est un worker
};
