/**
 * @file Provides a function to help find the real position of an element relative to the page.. Code from http://www.quirksmode.org/js/findpos.html
 * @author Tom Jenkins tom@itsravenous.com
 */

/**
 * @param {HTMLElement}
 * @return {Array} coordinate representing top-left corner of element
 */
function findPos(obj) {
	var curleft = curtop = 0;

	if (obj.offsetParent) {
		do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);

		return [curleft, curtop];
	}
}

module.exports = findPos;
