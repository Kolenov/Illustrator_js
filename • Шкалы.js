"use strict";
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNames = doc.swatches;
var startStripPoint = doc.width / 2 - mm * 8; //начало первого стрипа
var startSwatchNamePoint = doc.width / 2 + mm * 4; //начало первого названия свотчеса
var addCmykMessage = "Add CMYK Swatches";
var addScaleMessage = "Add Scales";
var addNameSwatchesMessage = "Add Name Colors";
var tintPercentage = [2, 10, 50, 80, 100];
//  устанавливаем ноль
doc.rulerOrigin = [0, 0];
//  деселект все   //
doc.selection = null;

//------Черный цвет регистрэйшн-----//
// var regColorBlack = swatchNames[1].color;
// regColorBlack.tint = 100;
// var RegBlack = regColorBlack;
//-------Белый цвет регистрэйшн-----//
var regColorWhite = swatchNames[1].color;
regColorWhite.tint = 0;
var regWhite = regColorWhite;
//--------------Без цвета------------//
var noColorSwatch = swatchNames[0].color;
var noColor = noColorSwatch;

var isMakeScaleLayer = true;
var isMakeSwatch = true;

for (var i = 0; i < swatchNames.length; i++) {
	if (swatchNames[i].name == ["C"] || swatchNames[i].name == ["M"] || swatchNames[i].name == ["Y"] || swatchNames[i].name == ["K"]) {
	   isMakeSwatch = false;
		break;
	}
}

if (isMakeSwatch === true) {
	var checkConfirm = confirm(addCmykMessage);
	if (checkConfirm === true) {
		addSpotColor("C", 100, DefineCMYK(100, 0, 0, 0)); //Cyan
		addSpotColor("M", 100, DefineCMYK(0, 100, 0, 0)); //Magenta
		addSpotColor("Y", 100, DefineCMYK(0, 0, 100, 0)); //Yellow
		addSpotColor("K", 100, DefineCMYK(0, 0, 0, 100)); //Black
	}
}

// ------- Шкалы ------- //
checkConfirm = confirm(addScaleMessage);
if (checkConfirm === true) {

	makeScaleLayer();

	for (i = 2; i < swatchNames.length; i++) {
		var boxGroup = doc.activeLayer.groupItems.add();
		var newPath = boxGroup.pathItems;
		makeStrip();
		startStripPoint -= mm * 3;
	}

}
// ------- имена свотчей ------- //
checkConfirm = confirm(addNameSwatchesMessage);
if (checkConfirm === true) {

	makeScaleLayer();

	for (i = 2; i < swatchNames.length; i++) {
		makeSwatchName(i);
	}
}

function makeScaleLayer() {
	for (var i = 0 - 1; i < doc.layers.length; i++) {
		if (doc.layers[i].name == "Scale") {
			isMakeScaleLayer = false;
			doc.activeLayer = doc.layers["Scale"];
		}
		break;
	}
	//  Создаем новый слой для шкал  //
	if (isMakeScaleLayer === true) {
		var newLayer = doc.layers.add();
		newLayer.name = "Scale";
		isMakeScaleLayer = false;
	}
}

function makeStrip() {
	for (var i = 0; i < tintPercentage.length; i++) {
		makeBox(tintPercentage[i]);
	}
}

function makeBox(tint) {
	var box = newPath.rectangle(mm * 3, mm * 2, mm * 3, mm * 2);

	box.stroked = true;
	box.strokeWidth = 0.1;
	box.filled = true;

	var boxFillColor = swatchNames[i].color;
	boxFillColor.tint = 100;
	box.strokeColor = boxFillColor;
	boxFillColor.tint = tint;
	box.fillColor = boxFillColor;

	box.position = [startStripPoint, docHeight - mm];
	startStripPoint -= mm * 3;
}

function makeSwatchName(counter) {
	var textGroup = doc.activeLayer.groupItems.add();

	var textRef = textGroup.textFrames.add();

	textRef.textRange.characterAttributes.size = 8;
	textRef.textRange.characterAttributes.stroked = false;
	textRef.textRange.characterAttributes.wrapInside = true;
	textRef.textRange.characterAttributes.fillColor = swatchNames[i].color;
	try {
		textRef.textRange.characterAttributes.textFont = app.textFonts["PragmaticaC"];
	} catch (e) {
		textRef.textRange.characterAttributes.textFont = app.textFonts["ArialMT"];
	}
	textRef.contents = swatchNames[counter].name;


	var textWidth = textRef.width;
	textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];

	textRef.duplicate();

	textRef.textRange.characterAttributes.stroked = true;
	textRef.textRange.characterAttributes.strokeWidth = 1;
	textRef.textRange.characterAttributes.strokeColor = regWhite;

	textRef.position = [startSwatchNamePoint, docHeight + 1.5 - mm];
	startSwatchNamePoint += textWidth;
}


function addSpotColor(name, tint, color) {
	var mySpots = doc.spots;
	var newSpot = mySpots.add();
	newSpot.color = color;
	newSpot.name = name;
	newSpot.tint = tint;
}

function DefineCMYK(C, M, Y, K) {
	var newCMYKColor = new CMYKColor();
	newCMYKColor.black = K;
	newCMYKColor.cyan = C;
	newCMYKColor.magenta = M;
	newCMYKColor.yellow = Y;
	return newCMYKColor;
}