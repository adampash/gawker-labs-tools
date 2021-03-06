// Run like this:
// cd client && $(npm bin)/webpack -w --config webpack.rails.config.js
// Note that Foreman (Procfile.dev) has also been configured to take care of this.

// NOTE: All style sheets handled by the asset pipeline in rails

const config = require('./webpack.common.config')
const webpack = require('webpack')

config.output = {
  filename: 'client-bundle.js',
  path: '../app/assets/javascripts/components'
}

// load jQuery from cdn or rails asset pipeline
// config.externals = {jquery: 'var jQuery'}

// You can add entry points specific to rails here
config.entry.push('./scripts/rails_only')

// See webpack.common.config for adding modules common to both the webpack dev server and rails
config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __SERVER__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE (disable w/false)
  }),
]

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
  },
  {
    test: /\.scss$/,
    loader: "style!css!autoprefixer-loader!sass"
  }, // loaders: ['style', 'css', 'sass', 'autoprefixer']},
  { test: /\.coffee$/, loader: 'coffee' }
)
module.exports = config

// Next line is Heroku specific. You'll have BUILDPACK_URL defined for your Heroku install.
// const devBuild = (typeof process.env.BUILDPACK_URL) === 'undefined'
// if (devBuild) {
//   console.log('Webpack dev build for Rails') // eslint-disable-line no-console
//   module.exports.devtool = 'eval-source-map'
// } else {
console.log('Webpack production build for Rails') // eslint-disable-line no-console
// }
