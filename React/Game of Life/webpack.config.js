var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.jsx',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  plugins: [
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};
