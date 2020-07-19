// Karma configuration
// Generated on Tue Jun 16 2020 19:08:36 GMT+0300 (GMT+03:00)
const webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'jasmine-jquery'],
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],

    // list of files / patterns to load in the browser
    files: [
      'test/index.ts'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'tests/index.ts': ["webpack"],
    },

    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    
    karmaTypescriptConfig: {
      compilerOptions: {
        noImplicitAny: true,
        noImplicitReturns: true,
        noImplicitThis: true,
        allowSyntheticDefaultImports: true,
        lib: ['DOM', 'ES5', 'ScriptHost', 'ES2015.Core', 'ES2015.Iterable']
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage-istanbul'],

    specReporter: {
      maxLogLines: 5, 
      suppressErrorSummary: true, 
      suppressFailed: false, 
      suppressPassed: false, 
      suppressSkipped: true, 
      showSpecTiming: true 
    },

    coverageIstanbulReporter: {
      reports: ['html', 'text-summary'],
      dir: './test/coverage', 
      fixWebpackSourcePaths: true,
      query: {
        esModules: true
      }
    },

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
