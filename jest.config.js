module.exports = {
  verbose: false,
  setupFiles: ['jest-prop-type-error', 'babel-polyfill'],
  transform: {
    '^.+\\.(css)$': './cssStub.js',
    '^.+\\.jsx?$': 'babel-jest'
  }
};
