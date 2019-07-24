module.exports = {
  ...require('@spotify/web-scripts/config/jest.config.js'),
  setupFilesAfterEnv: ['@spotify/polly-jest-presets'],
};
