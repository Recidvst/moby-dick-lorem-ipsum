import Vue from 'vue';

Vue.filter('cropString', (str, maxLen = 250, separator = ' ') => {
  if (str.length <= maxLen) {
    return str;
  }
  const returnStr = str.substr(0, str.lastIndexOf(separator, maxLen));
  if (
    returnStr.charAt(returnStr.length - 1) === ',' ||
    returnStr.charAt(returnStr.length - 1) === '.'
  ) {
    return returnStr.slice(0, -1) + '...';
  }
  return returnStr + '...';
});
