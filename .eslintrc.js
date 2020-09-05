module.exports = {
  'ecmaFeatures': {
    'modules': true,
    'spread' : true,
    'restParams' : true
  },
  'env': {
    'es6': true,
    'mocha': true,
    'node': true
  },
  'parserOptions': {
    'ecmaVersion': 2017,
    'sourceType': 'module',
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true
    }
  },
  'globals': {
    'reset': 'readonly',
    'save': 'readonly'
  },
  'extends': [
    'eslint:recommended',
    'espruino-globals'
  ],
  'rules': {
    'indent': [
      'error',
      2
    ],

    'no-console': 0,
    'semi': ['error', 'never'],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ]
  }
}
