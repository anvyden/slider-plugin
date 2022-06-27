const webpack = require('webpack')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  demoPage: path.join(__dirname, './demo-page'),
  assets: 'assets/',
}

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }

  if (isProd) {
    config.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
    ]
  }

  return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
const assetFileName = isDev ? `[name][ext]` : `[hash][ext][query]`

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
            [
              'postcss-preset-env',
            ]
          ]
        }
      }
    }
  ]

  if (extra) {
    loaders.push(extra)
  }

  return loaders
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader'
    },
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  return [
    new HTMLWebpackPlugin({
      filename: `index.html`,
      template: `${PATHS.demoPage}/demo-page.pug`,
      inject: 'body',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/${filename('css')}`
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${PATHS.demoPage}/static`,
          to: `${PATHS.dist}/static`
        },
      ]
    })
  ]
}

module.exports = {
  entry: {
    plugin: [`${PATHS.src}/app.ts`],
    demo: [`${PATHS.demoPage}/demo-page.ts`]
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    clean: true,
  },
  cache: {
    type: 'memory'
  },
  resolve: {
    extensions: ['.js', '.ts', '.pug', '.scss', '.json'],
    alias: {
      '~': path.resolve(__dirname, 'src'),
    }
  },
  optimization: optimization(),
  target: isDev ? 'web' : 'browserslist',
  devServer: {
    compress: true,
    port: 8081,
    watchFiles: `${PATHS.demoPage}/**/*.pug`,
    open: {
      app: {
        name: 'firefox'
      }
    }
  },
  devtool: isDev ? 'source-map' : false,
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: isDev,
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf|svg)$/,
        type: 'asset/resource',
        include: /fonts/,
        generator: {
          filename: `${PATHS.assets}fonts/${assetFileName}`
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      }
    ]
  }
}
