export default {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.[jt]sx?$': [
        '@swc/jest',
        {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            target: 'es2020',
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      ],
    },
    setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
    coverageThreshold: {
        global: {
            branches: 85,
            functions: 85,
            lines: 90,
            statements: 90,
        },
    },
    testPathIgnorePatterns: [
        '/node_modules/',
        '/cypress/',
        '/Cypress/',
        '((\\.|/)(spec))\\.tsx?$',
    ],
    moduleNameMapper: {
      '^@docusaurus/Link$': '<rootDir>/jest/mockComponent.js',
    },
    roots: ['<rootDir>/src'],
};
