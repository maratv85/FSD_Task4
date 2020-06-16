const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Autoprefixer = require('autoprefixer');


module.exports = (env, options) => {
  const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist')
  };

  const PAGES_DIR = `${PATHS.src}/pages/`;

  const production = options.mode === 'production';
  const publicDir = production ? 'https://maratv85.github.io/FSD_Task2/' : '/';
  //const publicDir = '/';

  return {
    entry: {
      app: `${PATHS.src}/js`,
    },
    devtool: production ? false : 'eval-sourcemap',
    devServer: {
	  //contentBase: './',
      overlay: {
        warnings: true,
        errors: true,
      },
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    output: {
      filename: 'js/[name].[hash].js',
      path: PATHS.dist,
      publicPath: publicDir,
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendors',
            test: /node_modules/,
            chunks: 'all',
            enforce: true,
          },
        },
      },
    },
    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        exclude: [/blocks/, /img/, /static/],
        use: {
          loader: 'file-loader',
          options: {
            name: './fonts/[name].[ext]',
            publicPath: '../',
          },
        },
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: [/fonts/, /static/],
        options: {
          name: './img/[name].[ext]',
          publicPath: '../',
        },
      },
      {
        test: /\.(svg|png|ico|xml|json)$/,
        exclude: [/fonts/, /blocks/, /img/, /node_modules/],
        use: [{
          loader: 'file-loader',
          options: {
            name: './favicons/[name].[ext]',
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
              data: '@import \'./src/styles/common\';',
              includePaths: [path.join(__dirname, 'src')],
            },
          },
		  //{
         //   loader: 'postcss-loader',
          //  options: { 
		 //     sourceMap: true, 
		//	  config: { path: './postcss.config.js' } 
		 //   }
         // },
          {
            loader: 'webpack-px-to-rem',
            query: {
              basePx: 14,
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

      new MiniCssExtractPlugin({
        filename: './css/[name].[hash].css',
      }),

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),

      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/index.pug`,
        filename: './index.html',
      }),

      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/uikit/colors-and-types/colors-and-types.pug`,
        filename: './pages/colors-and-types.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/uikit/cards/cards.pug`,
        filename: './pages/cards.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/uikit/form-elements/form-elements.pug`,
        filename: './pages/form-elements.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/uikit/headers-and-footers/headers-and-footers.pug`,
        filename: './pages/headers-and-footers.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website/landing-page/landing-page.pug`,
        filename: './pages/landing-page.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website/registration/registration.pug`,
        filename: './pages/registration.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website/room-details/room-details.pug`,
        filename: './pages/room-details.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website/search-room/search-room.pug`,
        filename: './pages/search-room.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/website/sign-in/sign-in.pug`,
        filename: './pages/sign-in.html',
      }),

    ],
  };
};
