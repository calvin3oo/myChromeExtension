const path = require('path');

module.exports = [
  {
    entry: './src/index.js',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist/scripts'),
    },
  }//,
  // {
  //   entry: './src/jquery.js',
  //   output: {
  //     filename: 'jquery.js',
  //     path: path.resolve(__dirname, 'dist/scripts'),
  //   },
  //   externals: {
  //     jquery: 'jQuery',
  //   },
  // },
];