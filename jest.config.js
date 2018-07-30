module.exports = {
    testEnvironment: 'node',
    moduleFileExtensions: [
        'js',
        'json',
        'vue'
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest'
    },
    collectCoverageFrom: [
        '<rootDir>/src/**/*.{js,vue}'
    ],
    coverageReporters: [
        'html',
        'text'
    ]

    /*
     * Temp
     * coverageThreshold: {
     * global: {
     * branches: 100,
     * functions: 100,
     * lines: 100,
     * statements: 100
     * }
     * }
     */
};
