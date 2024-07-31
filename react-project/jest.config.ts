export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
    '^.+\\.(js|jsx)$': 'babel-jest', 
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(some-library|another-library)/)'
  ],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
};