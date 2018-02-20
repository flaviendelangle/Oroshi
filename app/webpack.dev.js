const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = merge(common, {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new StyleLintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.s?(a|c)ss',
      failOnError: false,
    })
  ]
});
