module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/mocks/jest.setup.ts'],
  testPathIgnorePatterns: [
    '<rootDir>/build/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/mocks/',
  ],
};
