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
    // The llms-txt plugin's dependencies (cheerio, unified, rehype, remark) ship as
    // ESM only, and Jest does not transform node_modules by default. Transforming
    // everything costs about two seconds on the full suite and avoids maintaining a
    // brittle allowlist of the whole unified ecosystem.
    transformIgnorePatterns: [],
    roots: ['<rootDir>/src'],
};
