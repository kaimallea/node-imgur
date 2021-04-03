module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/mocks/jest.setup.js'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/mocks/',
  ],
};
