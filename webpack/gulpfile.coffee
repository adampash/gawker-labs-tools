gulp = require 'gulp'
gutil = require 'gulp-util'
webpack = require("webpack")
WebpackDevServer = require("webpack-dev-server")
# WebpackDevServer = require("webpack-hot-middleware/client")
webpackConfig = require("./webpack.hot.config.js")
# webpackProductionConfig = require("./webpack.production.config.js")
map = require 'map-stream'
touch = require 'touch'
_ = require 'underscore'

# Load plugins
$ = require('gulp-load-plugins')()

# CSS
gulp.task('css', ->
  gulp.src(['assets/stylesheets/*.scss'])
    .pipe($.compass({
      sass: 'assets/stylesheets'
      image: 'assets/stylsheets/images'
      style: 'nested'
      comments: false
      bundle_exec: true
      time: true
    }))
    .on('error', (err) ->
      gutil.log err
    )
    .pipe($.size())
    .pipe(gulp.dest('../app/assets/stylesheets'))
)

gulp.task('copy-assets', ->
    gulp.src('assets/images/**')
      .pipe(gulp.dest('../app/assets/images'))
      .pipe($.size())
)

# Some quick notes on using fontcustom.
# First you need to install some additional software
# as detailed at https://github.com/FontCustom/fontcustom#installation
# On MacOSX, this comment was the only way I got things to work: https://github.com/FontCustom/fontcustom/issues/209#issuecomment-48014939
# Otherwise I got a Python import error.
#
# Then once things are working, things here are setup so that the generated font
# is base64 encoded and included in the css file. For this to work, you
# need to edit the generated scss file at src/styles/_fontcustom.scss to remove
# its font-face imports.
# Font compilation
gulp.task('font', $.shell.task([
  'fontcustom compile'
]))

gulp.task('font-base-64', ->
  gulp.src('assets/fonts/*.ttf')
    .pipe($.rename('fontcustom.ttf'))
    .pipe($.cssfont64())
    .pipe($.rename('_fontcustom_embedded.scss'))
    .pipe(gulp.dest('src/styles/'))
)

gulp.task "webpack:build", ['css'], (callback) ->
  # Run webpack.
  webpack webpackProductionConfig, (err, stats) ->
    throw new gutil.PluginError("webpack:build", err)  if err
    gutil.log "[webpack:build]", stats.toString(colors: true)
    callback()
    return


# Create a single instance of the compiler to allow caching.
devCompiler = webpack(webpackConfig)
gulp.task "webpack:build-dev", (callback) ->

  # Run webpack.
  devCompiler.run (err, stats) ->
    throw new gutil.PluginError("webpack:build-dev", err)  if err
    gutil.log "[webpack:build-dev]", stats.toString(colors: true)
    callback()
    return

  return

devServer = {}
gulp.task "webpack-dev-server", (callback) ->
  # Ensure there's a `./public/main.css` file that can be required.

  # Start a webpack-dev-server.
  devServer = new WebpackDevServer(webpack(webpackConfig),
    # contentBase: './assets/javascripts'
    publicPath: webpackConfig.output.publicPath
    hot: true
    watchDelay: 100
    noInfo: true
    stats: {colors: true}
  )
  console.log webpackConfig.home
  url = "0.0.0.0"
  devServer.listen 3000, url, (err) ->
    throw new gutil.PluginError("webpack-dev-server", err) if err
    gutil.log "[webpack-dev-server]", "#{url}:3000"
    callback()

  return

gulp.task 'default', ->
  gulp.start 'build'

gulp.task 'build', ['webpack:build', 'copy-assets']

gulp.task 'watch', ['css', 'copy-assets', 'webpack-dev-server'], ->
  gulp.watch(['assets/stylesheets/**'], ['css'])
  gulp.watch(['assets/images/**'], ['copy-assets'])
