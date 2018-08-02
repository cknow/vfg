module.exports = {
    extends: [
        '@cknow/eslint-config',
        '@cknow/eslint-config/plugins/vue'
    ],
    globals: {
        window: true
    },
    rules: {
        'no-empty-function': ['error', {
            allow: ['arrowFunctions']
        }],
        'require-jsdoc': 'off',
        'vue/no-v-html': 'off'
    }
};
