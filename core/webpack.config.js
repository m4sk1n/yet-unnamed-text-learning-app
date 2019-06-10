let webpack = require('webpack');
let path = require('path')

module.exports = {
  mode: "development",

  entry: './src/index.ts',

  output: {
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
    publicPath: './public'
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'ts-loader'
        }
      },
      // addition - add source-map support
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  target: 'node'

};
