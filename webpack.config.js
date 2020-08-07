const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'genetic-algorithm.js',
    library: 'ga',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: 'babel-loader',
    }],
  },
};
