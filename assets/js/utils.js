// matchheight elements
export function matchSomeHeights(array) {
  if (!array) {
    return false;
  }
  setTimeout((time) => {
    const heights = [];
    array.forEach((top) => {
      // remove current height to allow recalculation
      if (top.style.removeProperty) {
        top.style.removeProperty('height');
      }
      else {
        top.style.removeAttribute('height');
      }
      const insideHeight = window.getComputedStyle(top, null).getPropertyValue('height');
      heights.push(parseInt(insideHeight));
    });
    const biggest = Math.max(...heights);
    array.forEach((top) => {
      top.style.height = biggest + 'px';
      return biggest;
    });
  }, 250);
}

// truncate text
export function truncateText(element, maxLength) {
  let truncated = String(element);
  if (truncated.length > maxLength) {
    truncated = truncated.substr(0, maxLength) + ' ...';
  }
  return truncated;
}

// truncate text to the nearest word
export function cropString(str, maxLen = 250, separator = ' ') {
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
}

// debounce event listeners
export function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

// object checks
export function isObject(o) {
  return !!o && o.constructor === Object && Object.keys(o).length !== 0 && typeof o !== 'undefined';
}

// copy to clipboard
export function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

// simple parallax
export function parallax() {
  const parallaxElements = [...document.getElementsByClassName('parallax')];

  const parallax = function (img) {
    const speed = 40;
    const pos = window.pageYOffset / speed + 'px';
    img.style.backgroundPosition = `center ${pos}`;
  };

  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', function (e) {
      parallaxElements.map((img) => {
        parallax(img);
        return img;
      });
    });
  }
}
