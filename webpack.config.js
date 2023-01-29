const ESLINTWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssPresetEnv = require('postcss-preset-env')
const path = require('path')
const webpack = require('webpack')

module.exports = (env) => {
  return {
    entry: {
      test1: './src/indexTest1.js',
      test2: './src/indexTest2.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      clean: {
        keep: 'assets',
      },
    },
    mode: env.NODE_ENV === 'PROD' ? 'production' : 'development',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000,
      open: true,
      historyApiFallback: true,
      writeToDisk: false,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [postcssPresetEnv({ browsers: '> 0.1%' })],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({ ...env }),
      }),
      new ESLINTWebpackPlugin(),
      new HtmlWebpackPlugin(),
    ],
  }
}
