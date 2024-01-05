/* eslint-disable react/prop-types */
module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['react-app', 'plugin:react/recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        'no-extra-semi': 2,
        'space-before-function-paren': [
            'error',
            { anonymous: 'always', named: 'never' }
        ],
        quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
        'spaced-comment': ['error', 'always', { markers: ['/'] }]
    }
}
