const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV === 'development';
const styleLoader = isDev ? 'style-loader' : MiniCssExtractPlugin.loader;
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: [],
  },
};


const config = {
  entry: {
    app: './src/js/main.js',
  },
  output: {
    filename: 'js/[name].js',
    publicPath: 'dist/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/](node_modules|deps)[\\/]/,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [styleLoader, 'css-loader', postcssLoader],
      },
      {
        test: /\.s[ac]ss$/,
        use: [styleLoader, 'css-loader', postcssLoader, 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: '../index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin(),
  ],
  devServer: {
    publicPath: 'dist/',
  },
};

if (!isDev) {
  const cssnano = require('cssnano');

  config.output.filename += '?hash=[contenthash:6]';

  postcssLoader.options.plugins.push(cssnano());

  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].css?hash=[contenthash:6]',
      chunkFilename: 'css/[id].css',
    }),
  );
}

module.exports = config;
