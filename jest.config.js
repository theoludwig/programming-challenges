module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './cli',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/cli/*.{js,ts}',
    '!**/*.d.ts',
    '!**/bin/**',
    '!**/node_modules/**',
    '!**/jest.config.js'
  ],
  coverageDirectory: '../coverage/',
  coverageReporters: ['text', 'cobertura']
}
