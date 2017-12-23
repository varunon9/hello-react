var debug = process.env.NODE_ENV !== 'production';
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : false,
  entry: './client/index.js',
  output: {
    path: __dirname + '/server/public/js',
    filename: 'main.min.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/,
      query: {
        presets: ['es2015', 'react'],
        plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
      }
    },
    {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }]
  }
};