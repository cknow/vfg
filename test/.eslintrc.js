module.exports = {
    extends: [
        '@cknow/eslint-config',
        '@cknow/eslint-config/plugins/jest'
    ],
    rules: {
        'max-lines-per-function': 'off',
        'max-lines': 'off',
        'max-statements': ['error', { max: 50 }],
        'newline-per-chained-call': ['error', { ignoreChainWithDepth: 5}],
        'require-jsdoc': 'off',
        'jest/prefer-expect-assertions': 'off'
    }
};
