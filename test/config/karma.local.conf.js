var path = require('path');
// var precss = require('precss');
// var autoprefixer = require('autoprefixer');

module.exports = function(config) {
  config.set({
    basePath: '../../',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      './test/*.js'
    ],

    preprocessors: {
      './src/components/**/*.js': ['webpack'],// 'sourcemap'],
      './test/*.js': ['webpack'],//, 'sourcemap']
      './src/components/**/*.js': ['coverage'],// 'sourcemap'],
    },

    coverageReporter: {
      type : 'text'
    },

    webpack: { //kind of a copy of your webpack config
      //devtool: 'inline-source-map', //just do inline source maps instead of the default
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
              presets: ['airbnb'],
              plugins: ['transform-class-properties', 'transform-export-extensions']
            }
          },
          {
            test: /\.json$/,
            loader: 'json',
          },
          {
            test: /\.(css|scss)$/,
            loaders: [
              'style?sourceMap',
              'css?modules&localIdentName=[local]!postcss-loader',
              'sass?sourceMap'
            ]
          },
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
          }, {
            test: /\.(jpe?g|gif|png|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
          }
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-sinon',
      'karma-chai',
      //'karma-sourcemap-loader',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],

    babelPreprocessor: {
      options: {
        presets: ['airbnb']
      }
    },

    reporters: ['mocha', 'coverage'],
    port: 8080,
    browserNoActivityTimeout: 100000,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    singleRun: true
  })
};