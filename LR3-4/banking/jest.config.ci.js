module.exports = {
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.testing.js' }]
  }
};
