module.exports = {
  modulePathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    '<rootDir>/src/**/{!(Presenter|events|app|interfaces)}.ts',
  ],
}
