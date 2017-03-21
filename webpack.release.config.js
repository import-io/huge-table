const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
  debug: false,
  entry: [
    // __dirname + '/src/index.js',
    __dirname + '/src/HugeTable.less',
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
      // },
      { test: /\.png$/, loader: 'file' },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
        options: {strictMath: true},
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000?name=fonts/[name].[ext]&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=fonts/[name].[ext]' },
    ],
  },
  postcss: [ autoprefixer ],
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // Merge all duplicate modules
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.UglifyJsPlugin({ // Optimize the JavaScript...
    //   compress: {
    //     warnings: false, // ...but do not show warnings in the console (there is a lot of them)
    //   },
    // }),
    new ExtractTextPlugin('HugeTable.css', {
      allChunks: true,
    }),
    new CopyWebpackPlugin([
      { from: './src/HugeTableLess.less', to: ''},
    ]),
  ],
  progress: true,
  colors: true,
};

module.exports = config;
