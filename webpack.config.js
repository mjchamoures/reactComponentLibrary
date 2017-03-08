var webpack = require('webpack');
var path = require('path');

// the directory path of the bundle file output
var BUILD_DIR = path.resolve(__dirname, 'src/client/public');

//  holds the directory path of the React application's codebase 
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry : APP_DIR + '/index.jsx', //the entry file using which the bundling process starts..similar to the class that  contains the 'main' mthoed
  output : { // instructs Webpack what to do after the bundling process has been completed. 
    path : BUILD_DIR,
    filename : 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;