const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const BUILD_DIR = path.join(__dirname, '/dist/');

module.exports = {
  entry: [
    path.join(__dirname, './src/index.js')
  ],
  plugins: [
    new HtmlWebpackPlugin({
      template: './webapp/src/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv(),

  ],
  output: {
    filename: '[name].[hash].js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /(node_modules|bower_components|\.test\.js)/,
        use: [{
          loader: 'eslint-loader',
          options: {
            configFile: '.eslintrc',
            failOnWarning: false,
            failOnError: false
          }
        }],
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
            module: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [autoprefixer]
            }
          }
        }, {
          loader: 'sass-loader'
        }]
      },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff'
          }
        }]
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: ['file-loader']
      },
    ],
  },
  resolve: {
    extensions: [".js", ".json", ".jsx", ".css", ".scss"]
  },
}
