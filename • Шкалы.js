"use strict";
var doc = activeDocument;
var lastSpot = doc.spots.length - 1;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNames = doc.swatches;
// first strip startPoint point
var startStripPoint = doc.width / 2 - mm * 8;
// first name startPoint point
var startSwatchNamePoint = doc.width / 2 + mm * 4;
var addCmykMessage = "Add CMYK Swatches";
var addScaleMessage = "Add Scales";
var addNameSwatchesMessage = "Add Name Colors";
var scaleLayerName = "Scale";
var tintPercentage = [2, 10, 50, 80, 100];
// set zero point for document
doc.rulerOrigin = [0, 0];
// deselect all
doc.selection = null;

// white color for registration marks
var regColorWhite = new SpotColor();
regColorWhite.spot = doc.spots[lastSpot];
regColorWhite.tint = 0;

if (isMakeSwatch()) {
    var checkConfirm = confirm(addCmykMessage);
    if (checkConfirm === true) {
        addSpotColor("C", 100, defineCMYK(100, 0, 0, 0)); //Cyan
        addSpotColor("M", 100, defineCMYK(0, 100, 0, 0)); //Magenta
        addSpotColor("Y", 100, defineCMYK(0, 0, 100, 0)); //Yellow
        addSpotColor("K", 100, defineCMYK(0, 0, 0, 100)); //Black
    }
}

// make scale
checkConfirm = confirm(addScaleMessage);
if (checkConfirm === true) {

    if (!findLayer(scaleLayerName)) {
        makeLayer(scaleLayerName);
    } else {
        doc.activeLayer = doc.layers[scaleLayerName];
    }
    // skip 2 swatches - NoColor and Registration
    for (i = 2; i < swatchNames.length; ++i) {
        var boxGroup = doc.activeLayer.groupItems.add();
        var newPath = boxGroup.pathItems;
        makeStrip(swatchNames[i]);
        startStripPoint -= mm * 3;
    }
}

// make swatches name
checkConfirm = confirm(addNameSwatchesMessage);
if (checkConfirm === true) {

    if (!findLayer(scaleLayerName)) {
        makeLayer(scaleLayerName);
    } else {
        doc.activeLayer = doc.layers[scaleLayerName];
    }
    // skip 2 swatches - NoColor and Registration
    for (i = 2; i < swatchNames.length; i++) {
        makeSwatchName.call(swatchNames[i]);
    }
}

/**
 *
 * @param name
 */
function makeLayer(name) {
    var newLayer = doc.layers.add();
    newLayer.name = name;
}

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
function findLayer(name) {
    for (var i = 0; i < doc.layers.length; ++i) {
        if (doc.layers[i].name == name) {
            return true;
        }
    }
    return false;
}

/**
 *
 * @returns {boolean}
 */
function isMakeSwatch() {
    for (var i = 0; i < swatchNames.length; ++i) {
        if (swatchNames[i].name == ["C"] || swatchNames[i].name == ["M"] || swatchNames[i].name == ["Y"] || swatchNames[i].name == ["K"]) {
            return false;
        }
    }
    return true;
}

/**
 *
 * @param {Color} color
 */
function makeStrip(color) {
    for (var i = 0; i < tintPercentage.length; i++) {
        makeBox.call(color, tintPercentage[i]);
    }
}

/**
 *
 * @param {number} tint
 */
function makeBox(tint) {
    var box = newPath.rectangle(mm * 3, mm * 2, mm * 3, mm * 2);

    box.stroked = true;
    box.strokeWidth = 0.1;
    box.filled = true;

    var boxFillColor = this.color;
    boxFillColor.tint = 100;
    box.strokeColor = boxFillColor;
    boxFillColor.tint = tint;
    box.fillColor = boxFillColor;

    box.position = [startStripPoint, docHeight - mm];
    startStripPoint -= mm * 3;
}

/**
 *
 */
function makeSwatchName() {
    var textGroup = doc.activeLayer.groupItems.add();
    var textRef = textGroup.textFrames.add();

    var textAttributes = textRef.textRange.characterAttributes;
    textAttributes.size = 8;
    textAttributes.stroked = false;
    textAttributes.wrapInside = true;
    textAttributes.fillColor = this.color;
    try {
        textAttributes.textFont = app.textFonts["PragmaticaC"];
    } catch (e) {
        textAttributes.textFont = app.textFonts["ArialMT"];
    }
    textRef.contents = this.name;

    textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];

    textRef.duplicate();

    textAttributes.stroked = true;
    textAttributes.strokeWidth = 1;
    textAttributes.strokeColor = regColorWhite;

    textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];
    startSwatchNamePoint += textRef.width;
}

/**
 *
 * @param {string} name
 * @param {number} tint
 * @param {Color} color
 */
function addSpotColor(name, tint, color) {
    var mySpots = doc.spots;
    var newSpot = mySpots.add();
    newSpot.color = color;
    newSpot.name = name;
    newSpot.tint = tint;
}

/**
 *
 * @param {number} C
 * @param {number} M
 * @param {number} Y
 * @param {number} K
 */
function defineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}
