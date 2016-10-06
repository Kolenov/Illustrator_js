'use strict';
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNames = doc.swatches;
var startStripPoint = doc.width / 2 - mm * 8; //start point for first strip
var startSwatchNamePoint = doc.width / 2 + mm * 4; //start point for swatche's names
var addCmykMessage = "Add CMYK Swatches";
var addScaleMessage = "Add Scales";
var addNameSwatchesMessage = "Add Name Colors";
var tintPercentage = [2, 10, 50, 80, 100];

doc.rulerOrigin = [0, 0];
doc.selection = null;

// black color for registration marks
var regColorBlack = swatchNames[1].color;
regColorBlack.tint = 100;
// white color for registration marks
var regColorWhite = swatchNames[1].color;
regColorWhite.tint = 0;
// no color
var noColor = new NoColor();

const CYAN = defineCMYK(100, 0, 0, 0);
const MAGENTA = defineCMYK(0, 100, 0, 0);
const YELLOW = defineCMYK(0, 0, 100, 0);
const BLACK = defineCMYK(0, 0, 0, 100);

var cmykSwatches = [
    {name: "C", color: CYAN},
    {name: "M", color: MAGENTA},
    {name: "Y", color: YELLOW},
    {name: "K", color: BLACK},
];

var scaleAttributes = [];

Checkbox.prototype.swapLabels = function swapLabels(uncheckedLabel, checkedLabel) {
    if (this.value == true) {
        this.text = checkedLabel;
        return;
    }
    this.text = uncheckedLabel;
};

var w = new Window("dialog");
w.orientation = "row";
w.alignChildren = "fill";

// var cyanColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.0, 0.5, 1.0]);
// var magentaColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.76, 0.0, 0.5]);
// var yellowColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [1.0, 0.92, 0.0]);
// var blackColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.0, 0.0, 0.0]);

var panelCMYKswatches = w.add("panel", undefined, "Add CMYK");
panelCMYKswatches.orientation = "column";
panelCMYKswatches.alignChildren = "left";
panelCMYKswatches.spacing = 3;
panelCMYKswatches.margins = [15, 20, 15, 15];

var swatchCMYKcheck = panelCMYKswatches.add("checkbox", undefined, "\u00A0 All");
swatchCMYKcheck.value = true;
swatchCMYKcheck.characters = 10;

swatchCMYKcheck.onClick = function () {
    this.swapLabels("\u00A0 None", "\u00A0 All");
    for (var i = 0; i < scaleAttributes.length; ++i) {
        if (scaleAttributes[i].color.colorType != "ColorModel.SPOT") {
            scaleAttributes[i].checker.value = this.value;
        }
    }
};

/////////////////////////////////////////////////////////////
var panelSPOTswatches = w.add("panel", undefined, "Add Pantone");
panelSPOTswatches.orientation = "column";
panelSPOTswatches.alignChildren = "left";
panelSPOTswatches.spacing = 3;
panelSPOTswatches.margins = [15, 20, 15, 15];

var swatchSPOTcheck = panelSPOTswatches.add("checkbox", undefined, "\u00A0 All");
swatchSPOTcheck.value = true;
swatchSPOTcheck.characters = 10;

swatchSPOTcheck.onClick = function () {
    this.swapLabels("\u00A0 None", "\u00A0 All");
    for (var i = 0; i < scaleAttributes.length; ++i) {
        if (scaleAttributes[i].color.colorType == "ColorModel.SPOT") {
            scaleAttributes[i].checker.value = this.value;
        }
    }
};

//panelCMYKswatches.add("panel {preferredSize: [1, 1]}");

function makeSwatchesChooser(collection, place) {
    var count = collection.length;
    for (var i = 0; i < count; ++i) {

        if (collection[i].colorType != "ColorModel.REGISTRATION") {
            var elementName = collection[i].name;
            var elementColor = collection[i].color;
            var swatchColor = cmyk2rgb(elementColor);

            var swatchGroup = place.add("group");
            swatchGroup.orientation = "row";

            var swatchRectangle = swatchGroup.add("panel {preferredSize: [20, 20]}");
            swatchRectangle.graphics.backgroundColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, swatchColor);
            var checkGroup = swatchGroup.add("group");
            checkGroup.margins = [0, 5, 0, 0];
            var swatchCheck = checkGroup.add("checkbox", undefined, elementName);
            swatchCheck.value = true;
            swatchCheck.text = "\u00A0" + elementName;

            scaleAttributes.push(new Swatches(swatchCheck, collection[i]));
        }
    }
}

makeSwatchesChooser(cmykSwatches, panelCMYKswatches);
makeSwatchesChooser(doc.spots, panelSPOTswatches);

// (function setChecked(element) {
//     if (element.children.length != null) {
//         for (var i = 0; i < element.children.length; ++i) {
//             if (element.children[i].type == 'checkbox') {
//                 element.children[i].value = true;
//             } else {
//                 setChecked(element.children[i]);
//             }
//         }
//     }
// })(w);

/**
 *
 * @param {Checkbox} checker
 * @param {Color} color
 * @param {string} name
 * @constructor
 */
function Swatches(checker, color) {
    this.checker = checker;
    this.color = color;
    this.name = this.checker.text;
}


w.show();

//
// // Confirm making CMYK swatches
// if (!findCMYKSwatces()) {
//     var isAddCMYKSwatches = confirm(addCmykMessage);
//     if (isAddCMYKSwatches === true) {
//         addSpotColor("C", 100, CYAN);
//         addSpotColor("M", 100, MAGENTA);
//         addSpotColor("Y", 100, YELLOW);
//         addSpotColor("K", 100, BLACK);
//     }
// }
// // Confirm making scales and swatches' names
// var isAddScale = confirm(addScaleMessage);
// var isAddSwatchesName = confirm(addNameSwatchesMessage);
//
// if (isAddScale || isAddSwatchesName) {
//     makeLayer("Scale");
//     // i = 2 skip first and second swatches
//     for (i = 2; i < swatchNames.length; i++) {
//         if (isAddScale) {
//             var boxGroup = doc.activeLayer.groupItems.add();
//             var newPath = boxGroup.pathItems;
//             makeStrip(swatchNames[i]);
//             startStripPoint -= mm * 3;
//         }
//         if (isAddSwatchesName) {
//             makeSwatchName(swatchNames[i]);
//         }
//     }
// }
//
// /**
//  *
//  * @returns {boolean}
//  */
// function findCMYKSwatces() {
//     for (var i = 0; i < swatchNames.length; ++i) {
//         if (swatchNames[i].name == ["C"] || swatchNames[i].name == ["M"] || swatchNames[i].name == ["Y"] || swatchNames[i].name == ["K"]) {
//             return true;
//         }
//     }
//     return false;
// }
//
//
// /**
//  *
//  * @param {string} [name]
//  */
// function makeLayer(name) {
//
//     name = name || "New Layer";
//
//     if (findLayer(name)) {
//         doc.activeLayer = doc.layers[name];
//         return;
//     }
//     var newLayer = doc.layers.add();
//     newLayer.name = name;
// }
//
// /**
//  *
//  * @param {string} name
//  * @returns {boolean}
//  */
// function findLayer(name) {
//     for (var i = 0; i < doc.layers.length; i++) {
//         if (doc.layers[i].name == name) {
//             return true;
//         }
//     }
//     return false;
// }
//
// /**
//  *
//  * @param {swatch} swatch
//  */
// function makeStrip(swatch) {
//     for (var i = 0; i < tintPercentage.length; i++) {
//
//         var box = newPath.rectangle(mm * 3, mm * 2, mm * 3, mm * 2);
//
//         box.stroked = true;
//         box.strokeWidth = 0.1;
//         box.filled = true;
//
//         var boxFillColor = swatch.color;
//         boxFillColor.tint = 100;
//         box.strokeColor = boxFillColor;
//         boxFillColor.tint = tintPercentage[i];
//         box.fillColor = boxFillColor;
//
//         box.position = [startStripPoint, docHeight - mm];
//         startStripPoint -= mm * 3;
//     }
// }
//
// /**
//  *
//  * @param {swatch} swatch
//  */
// function makeSwatchName(swatch) {
//     var textGroup = doc.activeLayer.groupItems.add();
//     var textRef = textGroup.textFrames.add();
//
//     var textRefAttributes = textRef.textRange.characterAttributes;
//     textRefAttributes.size = 8;
//     textRefAttributes.stroked = false;
//     textRefAttributes.wrapInside = true;
//     textRefAttributes.fillColor = swatch.color;
//
//     try {
//         textRefAttributes.textFont = app.textFonts["PragmaticaC"];
//     } catch (e) {
//         textRefAttributes.textFont = app.textFonts["ArialMT"];
//     }
//
//     textRef.contents = swatch.name;
//     textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];
//
//     // dublicate and place over textRef
//     textRef.duplicate();
//
//     // change textRef's stroke to white color 1pt width
//     textRefAttributes.stroked = true;
//     textRefAttributes.strokeWidth = 1;
//     textRefAttributes.strokeColor = regColorWhite;
//
//     textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];
//     startSwatchNamePoint += textRef.width;
// }
//
/**
 *
 * @param {string} name
 * @param {number} tint
 * @param {CMYKColor} color
 */
function addSpotColor(name, tint, color) {
    var mySpots = doc.spots;
    var newSpot = mySpots.add();
    newSpot.color = color;
    newSt.name = name;
    newSpot.tint = tint;
}

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
/**
 *
 * @param {CMYKColor} color
 * @returns {*[]}
 */
function cmyk2rgb(color) {
    var C = color.cyan / 100;
    var M = color.magenta / 100;
    var Y = color.yellow / 100;
    var K = color.black / 100;

    var R = (1 - C) * (1 - K);
    var G = (1 - M) * (1 - K);
    var B = (1 - Y) * (1 - K);

    return [R, G, B];
}


// lab2xyz = function (lab) {
//     var l = lab[0];
//     var a = lab[1];
//     var b = lab[2];
//     var x;
//     var y;
//     var z;
//
//     y = (l + 16) / 116;
//     x = a / 500 + y;
//     z = y - b / 200;
//
//     var y2 = Math.pow(y, 3);
//     var x2 = Math.pow(x, 3);
//     var z2 = Math.pow(z, 3);
//     y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
//     x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
//     z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
//
//     x *= 95.047;
//     y *= 100;
//     z *= 108.883;
//
//     return [x, y, z];
// };