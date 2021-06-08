module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './cli',
  testPathIgnorePatterns: [
    '<rootDir>/commands/run/test.ts',
    '<rootDir>/services/Test.ts',
    '<rootDir>/node_modules'
  ]
}
