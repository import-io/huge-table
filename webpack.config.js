const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  debug: true,
  devtool: 'source-map',
  entry: './example/demo.js',
  output: {
    path: './example/public',
    filename: 'bundle.js',
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' },
    ],
  },
  plugins: [
    new ExtractTextPlugin('bundle.css'),
  ],
};
