module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        "cypress/globals": true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'react',
        "cypress"
    ],
    'rules': {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'windows'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        "react/react-in-jsx-scope": "off",
        "react/prop-types": 0,
    },
    'ignorePatterns': ['.eslintrc.js', 'build', 'node_modules', 'cypress.config.js'],
    'settings': {
        'react': {
            'version': "detect",
        },
    },
}
