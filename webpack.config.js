var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./frontend/timelesslapse.jsx",
  output: {
    path: path.join(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
	plugins: [
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin()
	  ],
  devtool: 'source-maps',
  resolve: {
    extensions: ["", ".js", ".jsx" ]
  }
};
