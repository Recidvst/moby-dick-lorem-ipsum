module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  rules: {
    indentation: 2,
    'string-quotes': 'double',
    'no-duplicate-selectors': true,
    'color-hex-length': 'long',
    'selector-combinator-space-after': 'always',
    'selector-attribute-quotes': 'always',
    'selector-attribute-operator-space-before': 'never',
    'selector-attribute-operator-space-after': 'never',
    'selector-attribute-brackets-space-inside': 'never',
    'declaration-block-trailing-semicolon': 'always',
    'declaration-no-important': true,
    'declaration-colon-newline-after': null,
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always',
    'number-leading-zero': 'always',
    'function-url-quotes': 'always',
    'media-feature-range-operator-space-before': 'always',
    'media-feature-range-operator-space-after': 'always',
    'media-feature-parentheses-space-inside': null,
    'media-feature-colon-space-before': 'never',
    'media-feature-colon-space-after': 'always',
    'rule-empty-line-before': [
      'always-multi-line',
      { except: ['after-rule', 'first-nested'], ignore: ['after-comment'] }
    ],
    'at-rule-no-unknown': null,
    'no-descending-specificity': null,
    'declaration-block-no-duplicate-properties': null,
    'font-family-no-missing-generic-family-keyword': null,
  },
};
