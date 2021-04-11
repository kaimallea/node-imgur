module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './src',
  setupFilesAfterEnv: ['<rootDir>/mocks/jest.setup.ts'],
  coveragePathIgnorePatterns: ['<rootDir>/mocks'],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 30,
      lines: 50,
      statements: 50,
    },
  },
  verbose: true,
};
