var path = require("path");

module.exports = {
  context: __dirname,
  entry: './lib/earth_kingdom_warrior.js',
  output: {
    filename: './lib/bundle.js',
    path: path.resolve(__dirname),
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['js', '*'],
  },
};