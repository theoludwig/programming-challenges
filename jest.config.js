module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './cli',
  testPathIgnorePatterns: ['<rootDir>/commands/run/test.ts'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts}',
    '!**/*.d.ts',
    '!**/bin/**',
    '!**/node_modules/**',
    '!**/jest.config.js'
  ],
  coverageDirectory: '../coverage/',
  coverageReporters: ['text', 'cobertura']
}
