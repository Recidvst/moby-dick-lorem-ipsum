module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'plugin:vue/essential'],
  globals: {
    $nuxt: 'readonly',
    ab: 'writeable',
  },
  plugins: ['vue', 'html', 'import'],
  // add your custom rules here
  rules: {
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'global-require': 0,
    'import/no-unresolved': 0,
    'no-shadow': 0,
    'import/extensions': 0,
    'import/newline-after-import': 0,
    'no-multi-assign': 0,
    'padded-blocks': 0,
    'no-tabs': 0,
    indent: ['error', 2],
    'eol-last': 0,
    'func-names': 0,
    'no-unneeded-ternary': 0,
    'max-len': 0,
    'consistent-return': 0,
    'no-param-reassign': ['error', { props: false }],
    'prefer-destructuring': 0,
    'space-in-parens': 0,
    'space-before-function-paren': 0,
    'no-bitwise': 0,
    'brace-style': ['warn', 'stroustrup'],
    'comma-dangle': [1, { objects: 'always-multiline' }],
    semi: 0,
    // allow debugger during development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/no-v-html': 0,
    'vue/max-attributes-per-line': [
      1,
      {
        singleline: 5,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      }
    ],
    'no-useless-escape': 0,
  },
};
