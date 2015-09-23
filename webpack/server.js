var path = require('path');
// var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.hot.config');
var WebpackDevServer = require("webpack-dev-server")

devServer = new WebpackDevServer(webpack(config), {
  // contentBase: './assets/javascripts'
  publicPath: config.output.publicPath,
  hot: true,
  watchOptions: { watchDelay: 100 },
  noInfo: true,
  stats: {colors: true}
})
var url = "0.0.0.0"

devServer.listen(3000, url, function(err)  {
  // throw new gutil.PluginError("webpack-dev-server", err) if err
  // gutil.log("[webpack-dev-server]", "#{url}:3000")
  // callback()
})



// var app = express();
// var compiler = webpack(config);
// 
// app.use(require('webpack-dev-server')(compiler, {
//   noInfo: true,
//   publicPath: config.output.publicPath
// }));

// app.use(require('webpack-hot-middleware')(compiler));

// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.listen(3000, 'localhost', function(err) {
//   if (err) {
//     console.log(err);
//     return;
//   }
// 
//   console.log('Listening at http://localhost:3000');
// });
