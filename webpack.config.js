const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    publicPath: '/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /.scss?$/,
        loader: ExtractTextPlugin.extract('css!sass!postcss-loader')
      }
    ]
  },
  postcss: () => {
    return [precss, autoprefixer];
  },
  plugins: [
    new ExtractTextPlugin('../css/main.css', {
      allChunks: true
    })
  ]
};
