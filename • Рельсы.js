'use strict';
var doc = activeDocument;
var lastSpot = doc.spots.length - 1;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;

// black color for registration marks
var regColorBlack = new SpotColor();
regColorBlack.spot = doc.spots[lastSpot];
regColorBlack.tint = 100;

// white color for registration marks
var regColorWhite = new SpotColor();
regColorWhite.spot = doc.spots[lastSpot];
regColorWhite.tint = 0;
// no color
var noColor = new NoColor();

doc.selection = null;
doc.rulerOrigin = [0, 0];

var railGroup = doc.activeLayer.groupItems.add();

// make rail
new makeBox(docHeight - mm, 0, docWidth, 2 * mm, regColorBlack);
// make central mark
new makeBox(docHeight - mm, docWidth / 2 - 2 * mm, 4 * mm, 2 * mm, regColorWhite);
new makeBox(docHeight - 2 * mm + 0.125, docWidth / 2 - 2 * mm, 4 * mm, 0.25, regColorBlack);
new makeBox(docHeight - mm, docWidth / 2 - 0.125, 0.25, 2 * mm, regColorBlack);
// make toLeft mark
new makeBox(docHeight - 4 * mm + 0.4, 0, 5 * mm, 0.4, regColorBlack);
new makeBox(docHeight - mm, 5 * mm - 0.4, 0.4, 3 * mm, regColorBlack);
new makeBox(docHeight, 5 * mm - 0.4, 0.4, mm, regColorWhite);
new makeBox(docHeight - 2 * mm, 0, 5 * mm - 0.4, 2 * mm - 0.4, regColorWhite);
new makeBox(docHeight - 3 * mm + 0.2, 0, 2 * mm, 0.4, regColorBlack);
// make toRight mark
new makeBox(docHeight - 4 * mm + 0.4, docWidth - 5 * mm, 5 * mm, 0.4, regColorBlack);
new makeBox(docHeight - mm, docWidth - 5 * mm, 0.4, 3 * mm, regColorBlack);
new makeBox(docHeight, docWidth - 5 * mm, 0.4, mm, regColorWhite);
new makeBox(docHeight - 2 * mm, docWidth - 5 * mm + 0.4, 5 * mm - 0.4, 2 * mm - 0.4, regColorWhite);
new makeBox(docHeight - 3 * mm + 0.2, docWidth - 2 * mm, 2 * mm, 0.4, regColorBlack);

// duplicate railGroup for staying at top of page and and place over railGroup object
railGroup.duplicate();
// place to bottom of page and rotate
railGroup.rotate(180);
railGroup.position = [0, 4 * mm];

/**
 *
 * @param {number} top
 * @param {number} left
 * @param {number} width
 * @param {number} height
 * @param {CMYKColor} [fillColor]
 * @constructor
 */
function makeBox(top, left, width, height, fillColor) {
    this.pathRef = railGroup.pathItems.rectangle(top, left, width, height);
    this.pathRef.stroked = false;
    this.pathRef.filled = true;
    this.pathRef.fillColor = fillColor;
}