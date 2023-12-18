/* eslint-env node */
const path = require('path');

const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_PATH = path.resolve('src');

module.exports = {
  entry: {
    index: path.resolve('.', 'src/index.tsx'),
  },
  output: {
    path: path.resolve('.', 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        include: [
          path.resolve(NODE_MODULES_PATH, '@gravity-ui/uikit'),
          SRC_PATH,
        ],
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [autoprefixer()] },
            },
          },
          'resolve-url-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],
  },
};
