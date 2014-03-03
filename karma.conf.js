// vim: set ft=javascript :

module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'browserify'],

    files: [
      'test/unit/**/*Spec.js'
    ],

    exclude: [],
    reporters: ['progress'],
    port: 9876,
    runnerPort: 9100,

    colors: true,
    logLevel: config.LOG_DEBUG,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,

    browserify: {
      watch: true
    },

    preprocessors: {
    'test/unit/**/*Spec.js': ['browserify']
    }
  });
};
