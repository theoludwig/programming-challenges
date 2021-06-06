module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './cli',
  testPathIgnorePatterns: [
    '<rootDir>/commands/run/test.ts',
    '<rootDir>/node_modules'
  ]
}
