const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./jsconfig.json') // or tsconfig.json if using TS

module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.js$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testEnvironment: 'jsdom'
}
