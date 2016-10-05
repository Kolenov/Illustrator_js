var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNAME = doc.swatches;
var _start = -29.8 * mm;
// ------- деселект все ------- //
doc.selection = null;

//------Черный цвет регистрэйшн-----//
    try {
        RegColorBL = swatchNAME["[Registration]"].color;
    }
    catch (e) {
        RegColorBL = swatchNAME["[Совмещение]"].color;
    }
    RegColorBL.tint = 100;
    var RegBlack = RegColorBL;
//-------Белый цвет регистрэйшн-----//
    try {
        RegColorWH = swatchNAME["[Registration]"].color;
    }
    catch (e) {
        RegColorWH = swatchNAME["[Совмещение]"].color;
    }
    RegColorWH.tint = 0;
    var RegWhite = RegColorWH;
//--------------Без цвета------------//
    try {
        NoneColorSW = swatchNAME["[None]"].color;
    }
    catch (e) {
        NoneColorSW = swatchNAME["[Нет]"].color;
    }
    noColor = NoneColorSW;

// ------- устанавливаем ноль -------  //
doc.rulerOrigin = [0, 0];
//  Проверяем наличие слоя сервометок и если есть удаляем  //
countOfLayers = doc.layers.length;
for (j = countOfLayers - 1; j >= 0; j--) {
    var targetLayer = doc.layers[j];
    var layerName = targetLayer.name;
    if (layerName == "Servo") {
        doc.layers[j].remove();
    }
}
// ---------- Создаем новый слой для сервометок ------------- //
var newLayer = doc.layers.add();
newLayer.name = "Servo";
doc.activeLayer = doc.layers["Servo"]; //делаем его активным
var ServoGroup = doc.activeLayer.groupItems.add();
// ---------- Матрица сервометок ------------- //
var _Colors = [];
try {
    _Colors[0] = MarkerColor(swatchNAME[2]);
}
catch (e) {
    _Colors[0] = noColor;
}
try {
    _Colors[1] = MarkerColor(swatchNAME[3]);
}
catch (e) {
    _Colors[1] = noColor;
}
try {
    _Colors[2] = MarkerColor(swatchNAME[4]);
}
catch (e) {
    _Colors[2] = noColor;
}
try {
    _Colors[3] = MarkerColor(swatchNAME[2]);
}
catch (e) {
    _Colors[3] = noColor;
}
try {
    _Colors[4] = MarkerColor(swatchNAME[5]);
}
catch (e) {
    _Colors[4] = noColor;
}
try {
    _Colors[5] = MarkerColor(swatchNAME[6]);
}
catch (e) {
    _Colors[5] = noColor;
}
try {
    _Colors[6] = MarkerColor(swatchNAME[2]);
}
catch (e) {
    _Colors[6] = noColor;
}
try {
    _Colors[7] = MarkerColor(swatchNAME[7]);
}
catch (e) {
    _Colors[7] = noColor;
}
try {
    _Colors[8] = MarkerColor(swatchNAME[8]);
}
catch (e) {
    _Colors[8] = noColor;
}
try {
    _Colors[9] = MarkerColor(swatchNAME[2]);
}
catch (e) {
    _Colors[9] = noColor;
}
try {
    _Colors[10] = MarkerColor(swatchNAME[9]);
}
catch (e) {
    _Colors[10] = noColor;
}
try {
    _Colors[11] = MarkerColor(swatchNAME[10]);
}
catch (e) {
    _Colors[11] = noColor;
}
try {
    _Colors[12] = MarkerColor(swatchNAME[2]);
}
catch (e) {
    _Colors[12] = noColor;
}
// ---------- Startcode ------------- //
Line(4 * mm, -2.5 * mm, 2.5 * mm, 4 * mm, _Colors[0]);
Line(4 * mm, -2.5 * mm - 10 * mm, 5 * mm, 4 * mm, _Colors[0]);
Line(4 * mm, -2.5 * mm - 10 * mm - 5 * mm, 2.5 * mm, 4 * mm, _Colors[0]);
// ---------- Сервометки ------------- //
if (swatchNAME.length == 3 || swatchNAME.length == 4) {
    var NumMarkers = 4;
}
if (swatchNAME.length == 5 || swatchNAME.length == 6) {
    var NumMarkers = swatchNAME.length - 1;
}
if (swatchNAME.length == 7 || swatchNAME.length == 8) {
    var NumMarkers = swatchNAME.length
}
if (swatchNAME.length == 9 || swatchNAME.length == 10) {
    var NumMarkers = swatchNAME.length + 1;
}
if (swatchNAME.length == 11 || swatchNAME.length == 12) {
    var NumMarkers = swatchNAME.length + 2;
}
if (swatchNAME.length == 13 || swatchNAME.length == 14) {
    var NumMarkers = swatchNAME.length + 3;
}
for (i = 0; i < NumMarkers; i++) {
    Markers(_Colors[i]);
    _start -= 13 * mm;
}

ServoWidth = ServoGroup.width;
ServoGroup.position = [docWidth - ServoWidth - 15 * mm, docHeight + 3 * mm];

/////////////////////////////////////////////
//             Блок функций                //
/////////////////////////////////////////////

//*********************************
// проверка на четность
//function is_even(number) {
//
//    if (!(number % 2)) {
//        alert("2");
//    }
//    if (!(number % 3)) {
//        alert("3");
//    }
//}
//*********************************

/**
 *
 * @param Top
 * @param Left
 * @param Width
 * @param Height
 * @param my_Fill
 * @constructor
 */
function Line(Top, Left, Width, Height, my_Fill) {
    pathRef = ServoGroup.pathItems.rectangle(Top, Left, Width, Height);
    pathRef.stroked = false;
    pathRef.filled = true;
    pathRef.fillColor = my_Fill;
}
/**
 *
 * @param my_Fill
 * @constructor
 */
function Markers(my_Fill) {
    var Marker = ServoGroup.pathItems.add();
    var points = [[-12.189, 0], [-5.66943, 11.3384], [0, 11.3384], [0, 0]];
    Marker.setEntirePath(points);
    Marker.closed = true;
    Marker.stroked = false;
    Marker.filled = true;
    Marker.fillColor = my_Fill;
    Marker.position = [_start, 4 * mm];
}

/**
 *
 * @param obj
 * @returns {*|SpotColor}
 * @constructor
 */
function MarkerColor(obj) {
    newColor = new SpotColor();
    newColor = obj.color;
    return newColor;
}