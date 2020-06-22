const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Autoprefixer = require('autoprefixer');


module.exports = (env, options) => {
 
  const production = options.mode === 'production';
  const publicDir = production ? 'https://maratv85.github.io/FSD_Task4/' : '/';
 

  return {
    entry: './src/index.ts',

    devtool: production ? false : 'eval-sourcemap',

    devServer: {
	    contentBase: path.join(__dirname, 'dist/'),
      overlay: {
        warnings: true,
        errors: true,
        compress: true,
        port: 3000,
        hot: true,
      },
      watchOptions: {
        ignored: /node_modules/,
      },
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve('./dist'),
      publicPath: publicDir,
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']
    },

    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
        options: {
          pretty: true,
        },
      }, 
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          "baseUrl": "./node_modules/@types",
          "typeRoots": ["./node_modules/@types"],
          "types": [
            "jasmine",
            "jasmine-jquery",
          ],
          "useBabel": true,
          "babelOptions": {
            "babelrc": false,
            "presets": [
              ["@babel/preset-env", { "targets": "last 2 versions, ie 11", "modules": false }],
            ]
          },
          "babelCore": "@babel/core",
        },
        exclude: [/node_modules\/(?!(@types)\/).*/]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/blocks/],
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]',
            publicPath: '../',
          },
        },
      },
      {
        test: /\.(svg|png|ico|xml|json)$/,
        exclude: [/blocks/, /node_modules/],
        use: [{
          loader: 'file-loader',
          options: {
            name: './favicon/[name].[ext]',
            publicPath: '../',
          },
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              data: '@import \'./src/style/common\';',
              includePaths: [path.join(__dirname, 'src')],
            },
          },
          {
            loader: 'webpack-px-to-rem',
            query: {
              basePx: 16,
              min: 1,
              floatWidth: 3,
            },
          },
        ],
      },
      ],
    },

    plugins: [
      Autoprefixer,

      // new webpack.DefinePlugin({
      //   'process.env': {
      //     NODE_ENV: JSON.stringify(nodeEnv),
      //   },
      // }),

      new MiniCssExtractPlugin({
        filename: './css/[name].[hash].css',
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),

      new HtmlWebpackPlugin({
        template: './page/index.pug',
        filename: './index.html',
      }),

      new webpack.LoaderOptionsPlugin({
        options: {
          tslint: {
            emitErrors: true,
            failOnHint: true,
          },
        },
      }),

      new CopyWebpackPlugin([
        { from: '../node_modules/jquery/dist/jquery.js', to: './lib/jquery.js' },
      ]),

    ],
  };
};
