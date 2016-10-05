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
var noColor = swatchNames[0].color;

const CYAN = defineCMYK(100, 0, 0, 0);
const MAGENTA = defineCMYK(0, 100, 0, 0);
const YELLOW = defineCMYK(0, 0, 100, 0);
const BLACK = defineCMYK(0, 0, 0, 100);

// var w = new Window ("dialog");
// var s = w.add ("statictext", undefined, "Static");
// var e = w.add ("edittext", undefined, "Edit");
// var b = w.add ("button", undefined, "Button");
// // The window's backround
// w.graphics.backgroundColor = w.graphics.newBrush (w.graphics.BrushType.SOLID_COLOR, [0.5, 0.0, 0.0]);
// // Font and its colour for the first item, statictext
// s.graphics.font = ScriptUI.newFont ("Helvetica", "Bold", 30);
// s.graphics.foregroundColor = s.graphics.newPen (w.graphics.PenType.SOLID_COLOR, [0.7, 0.7, 0.7], 1);
// // Font and colours for the second item, edittext
// e.graphics.font = ScriptUI.newFont ("Letter Gothic Std", "Bold", 30);
// e.graphics.foregroundColor = e.graphics.newPen (e.graphics.PenType.SOLID_COLOR, [1, 0, 0], 1);
// e.graphics.backgroundColor = e.graphics.newBrush (e.graphics.BrushType.SOLID_COLOR, [0.5, 0.5, 0.5]);
// // Font for the tird control, a button. Can't set colours in buttons
// b.graphics.font = ScriptUI.newFont ("Minion Pro", "Italic", 30);
// w.show ();
//
//
// var w = new Window('dialog');
// var greenPen = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR,[0, .6, .2],1);
// var bluePen = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR,[0, .2, .6],1);
// var defPen = w.graphics.backgroundColor;
// w.add("button{text: 'go GREEN'}").onClick = function(){w.graphics.backgroundColor = greenPen;};
// w.add("button{text: 'go BLUE'}").onClick = function(){w.graphics.backgroundColor = bluePen;};
// w.add("button{text: 'get LOST'}").onClick = function(){w.graphics.backgroundColor = defPen;};
// w.show();


// var w = new Window("dialog");
//
// var components = {
//     color: {
//         type: 'color', label: 'Color',
//         value: '#ff0000'
//     }
// };
// var s = ['cyan', 'magenta', 'yellow', 'black'];
// var greenPen = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0, .6, .2], 1);
//
// var list = w.add('listbox', undefined, undefined, {
//     numberOfColumns: 3,
//     showHeaders: true,
//     columnTitles: ['Typeface', 'Style', 'Type', 'Status'],
//     columnWidths: [150, 150, 100],
//     multiselect: true
// });
// //list.graphics.backgroundColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.5, 0.0, 0.0]);
// var i, j, list_item, parts;
// for (i = 0; i < s.length; i++) {
//     parts = s[i].split('\t');
//     list_item = list.add('item', parts[0]);
//     list_item.image = greenPen;
//
//     // for (j = 1; j < parts.length; j++) {
//     //     list_item.subItems[j-1].text = parts[j];
//     //     list_item.subItems[j-1].backgroundColor = e.graphics.newBrush(e.graphics.BrushType.SOLID_COLOR, [0.5, 0.0, 0.0]);
//     // }
// }
// w.show();

var w = new Window("dialog");
w.orientation = 'column';
w.alignChildren = "fill";


var cyanColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.0, 0.5, 1.0]);
var magentaColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.76, 0.0, 0.5]);
var yellowColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [1.0, 0.92, 0.0]);
var blackColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, [0.0, 0.0, 0.0]);


//var panelScaleNameChooser = w.add("panel", undefined);
//var nameCheck = panelScaleNameChooser.add("checkbox", undefined, "\u00A0Add Names");

w.add("statictext", undefined, "Add Scales");

var panelSwatches = w.add("panel", undefined);
panelSwatches.orientation = 'column';
panelSwatches.alignChildren = 'fill';
panelSwatches.padding = 15;

var swatchCheck = panelSwatches.add("checkbox");
var swatchCheckChild = [];

swatchCheck.onClick = function () {
	swatchCheck.setLabel("\u00A0 Uncheck All", "\u00A0 Check All");
	for (var i = 0; i<swatchCheckChild.length; ++i){
		swatchCheckChild[i].value = this.value;
	}
}

panelSwatches.add("panel {preferredSize: [1, 1]}");

var swatchGroupCyan = panelSwatches.add("group");
var swatchCheckCyan = swatchGroupCyan.add("checkbox", [0, 0, 15, 15]);
swatchCheckChild.push(swatchCheckCyan);
var swatchRectCyan = swatchGroupCyan.add("panel {preferredSize: [20, 20]}");

swatchRectCyan.graphics.backgroundColor = cyanColor;
swatchGroupCyan.add("statictext", undefined, "Cyan");

var swatchGroupMagenta = panelSwatches.add("group");
var swatchCheckMagenta = swatchGroupMagenta.add("checkbox", [0, 0, 15, 15]);
swatchCheckChild.push(swatchCheckMagenta);
var swatchRectMagenta = swatchGroupMagenta.add("panel {preferredSize: [20, 20]}");
swatchRectMagenta.graphics.backgroundColor = magentaColor;
swatchGroupMagenta.add("statictext", undefined, 'Magenta');

var swatchGroupYellow = panelSwatches.add('group');
var swatchCheckYellow = swatchGroupYellow.add("checkbox", [0, 0, 15, 15]);
swatchCheckChild.push(swatchCheckYellow);
var swatchRectYellow = swatchGroupYellow.add("panel {preferredSize: [20, 20]}");
swatchRectYellow.graphics.backgroundColor = yellowColor;
swatchGroupYellow.add("statictext", undefined, 'Yellow');

var swatchGroupBlack = panelSwatches.add('group');
var swatchCheckBlack = swatchGroupBlack.add("checkbox", [0, 0, 15, 15]);
swatchCheckChild.push(swatchCheckBlack);
var swatchRectBlack = swatchGroupBlack.add("panel {preferredSize: [20, 20]}");
swatchRectBlack.graphics.backgroundColor = blackColor;
swatchGroupBlack.add("statictext", undefined, 'Black');




(function () {
	//var panelSwatches = w.add('panel');
	//panelSwatches.orientation = 'column';
	//panelSwatches.alignChildren = 'toLeft';

	var spotCount = doc.spots.length;
	for (var i = 0; i < spotCount; ++i) {
		var swatchGroup = panelSwatches.add('group');
		swatchGroup.orientation = 'row';
		var swatchCheck = swatchGroup.add("checkbox", [0, 0, 15, 15]);
		swatchCheckChild.push(swatchCheck);
		var colorw = doc.spots[i].color;
		var swatchRect = swatchGroup.add("panel {preferredSize: [20, 20]}");
		var myColor = w.graphics.newBrush(w.graphics.BrushType.SOLID_COLOR, cmyk2rgb(colorw));

		swatchRect.graphics.backgroundColor = myColor;
		var name = doc.spots[i].name;

		var swatchName = swatchGroup.add("statictext", undefined, name);
	}
})();


(function setChecked(element) {
	if (element.children.length != null) {
		for (var i = 0; i < element.children.length; ++i) {
			if (element.children[i].type == 'checkbox') {
				element.children[i].value = true;
			} else {
				setChecked(element.children[i]);
			}
		}
	}
})(w);

Checkbox.prototype.value = true;
Checkbox.prototype.setLabel = function (checkedLabel, uncheckedLabel) {
	if (this.value == true) {
		this.text = checkedLabel;
		return;
	}
	this.text = uncheckedLabel;
};


swatchCheck.setLabel("\u00A0 Uncheck All", "\u00A0 Check All");


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