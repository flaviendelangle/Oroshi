const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const config = require('./webpack.dev');

// https://webpack.js.org/configuration/dev-server/
const options = {
  publicPath: config.output.publicPath,
  hot: true,
  host: 'localhost',
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  stats: "minimal",
}

webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const server = new webpackDevServer(compiler, options);

server.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }

  console.log('Listening at localhost:3000');
});
