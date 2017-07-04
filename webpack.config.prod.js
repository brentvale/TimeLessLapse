const path = require('path');
const webpack = require('webpack');

export default {
  context: __dirname,
  entry: "./frontend/timelesslapse.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
	plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015","react"]
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx" ]
  }
};