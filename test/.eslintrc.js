module.exports = {
    extends: [
        '@cknow/eslint-config',
        '@cknow/eslint-config/plugins/jest'
    ],
    rules: {
        'jest/prefer-expect-assertions': 'off'
    }
};
