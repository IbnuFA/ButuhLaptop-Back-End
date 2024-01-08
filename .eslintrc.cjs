module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
    {
      'env': {
        'node': true,
      },
      'files': [
        '.eslintrc.{js,cjs}',
      ],
      'parserOptions': {
        'sourceType': 'script',
      },
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  "plugins": ["prettier"],
  "rules": {
    // "prettier/prettier": "error",
    "prettier/prettier": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off"
  },
  "extends": ["plugin:prettier/recommended"]
};
