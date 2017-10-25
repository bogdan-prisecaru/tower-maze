const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const alias = require('./webpack/alias');
/**
 * Metadata
 */
const METADATA = {
  title: 'Bogdan Prisecaru - Tower Maze - Game',
  baseUrl: '/',
};
/**
 * Plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(config) {
  let _CONFIG_ = { // default config if nothing is passed from CLI
    environment: (config && config.environment) ? config.environment : 'dev',
    theme: (config && config.theme) ? config.theme : 'default'
  };
  console.info('*** Environment', _CONFIG_.environment);
  console.info('*** Theme', _CONFIG_.theme);

  return merge({
    entry: {
      // polyfill: [
      //   path.resolve(`${alias.path.client}/polyfill.ts`),
      // ],
      app: [
        path.resolve(`${alias.path.client}/main.ts`)
      ]
    },
    output: {
      path: path.join(process.cwd(), 'public'),
      filename: '[name].js',
      chunkFilename: '[chunkhash].[name].js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(`${alias.path.client}/index.ejs`),
        title: METADATA.title,
        chunksSortMode: function(a, b) {
          const entryPoints = ['polyfill', 'vendor', 'app'];
          return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
        },
        metadata: METADATA,
        inject: 'head' // we need set to body for ng4 - otherwise it breaks
      })
    ],
    resolveLoader: {
      modules: ['node_modules']
    },
    resolve: {
      modules: [
        'devtools',
        'client/src',
        'server',
        'e2e',
        'node_modules'
      ],
      extensions: ['.ts', '.js', '.json', '.scss', '.css', '.html', '.png', '.jpeg'],
      alias: Object.assign({},
        alias.bootstrap,
        alias.model,
        alias.module,
        alias.webc,
        alias.ui,
      )
    },
    node: {
      global: true,
      process: true,
      console: true,
      fs: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                useTranspileModule: true,
                useCache: true
              }
            }
          ]
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },
        {
          test: /\.(jpe?g|gif|png|json)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'resources/'
              }
            }
          ]
        }
      ]
    }
  }, require('./webpack/' + _CONFIG_.environment)(_CONFIG_))
}
