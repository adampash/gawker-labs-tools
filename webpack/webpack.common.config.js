// Common webpack configuration used by webpack.hot.config and webpack.rails.config.

const path = require('path');

module.exports = {
  // the project dir
  context: __dirname,
  entry: [
    './assets/javascripts/app.js',
    './assets/stylesheets/app.scss'
  ],

  resolve: {
    root: [path.join(__dirname, 'scripts'),
           path.join(__dirname, 'assets/javascripts'),
           path.join(__dirname, 'assets/stylesheets')],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.scss', '.css', 'config.js', '.cjsx', '.coffee'],
    alias: {
    }
  },
  module: {
    loaders: []
  }
};
