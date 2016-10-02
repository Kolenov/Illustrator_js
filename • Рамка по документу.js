'use strict';
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;

doc.rulerOrigin = [0, 0];
doc.selection = null;

// make rectangle with height = docHeight and width - docWidth
var pathRef = doc.activeLayer.pathItems.rectangle(docHeight, 0, docWidth, docHeight);
pathRef.filled = false;
pathRef.stroked = true;
pathRef.strokeWidth = 0.1;
pathRef.strokeColor = defineCMYK(0, 0, 0, 100);
pathRef.selected = true;


/**
 *
 * @param {number} C
 * @param {number} M
 * @param {number} Y
 * @param {number} K
 * @returns {CMYKColor}
 */
function defineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}