// matchheight elements
export function matchSomeHeights(array) {
    if ( !array ) return false; 
    setTimeout( (time) => {
        let heights = [];
        array.forEach( (top) => {
            let insideHeight = window.getComputedStyle(top, null).getPropertyValue('height');
            heights.push(parseInt(insideHeight));
        });
        let biggest = Math.max(...heights);
        array.forEach( (top) => {
            top.style.height = biggest + 'px';
        });
    }, 250);
}

// truncate text
export function truncateText(element, maxLength) {
    let truncated = String(element);
    if (truncated.length > maxLength) {
        truncated = truncated.substr(0,maxLength) + ' ...';
    }
    return truncated;
}

// debounce event listeners
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// object checks
export function isObject(o) {
    return (!!o) && (o.constructor === Object) && Object.keys(o).length !== 0 && typeof o !== 'undefined';
};

// is email?
export function validateEmail(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

// fetch headers
export function setFetchHeaders(token) {
    token = token || '';
    return new Headers({
        'Content-Type':'application/json', 
        'Access-Control-Origin': '*',
        'x-access-token': token
    })
}
  
// AUTH
// Set JWT token in localStorage
export function setJWTstorage(key,value) {
    localStorage.setItem(key, value);
}
// Get JWT token from localStorage
export function getJWTstorage(key) {
    return localStorage.getItem(key);
}
// Delete JTW token from localStorage
export function deleteJWTstorage(key) {
    localStorage.removeItem(key);
}

// copy to clipboard
export function copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};