module.exports = {
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.testing.js' }]
  },
  setupFiles: ['<rootDir>/.jest/setEnvVars.js']
};
