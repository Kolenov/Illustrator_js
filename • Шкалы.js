var AIversion = version.slice(0, 2);
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNAME = doc.swatches;
var Start_Strip = doc.width / 2 - mm * 8; //начало первого стрипа
var start = doc.width / 2 + mm * 4; //начало первого названия свотчеса
var AddCMYK = "Add CMYK Swatches";
var Shkalky = "Add Scale";
var Name_Swatches = "Add Name Colors";

//  устанавливаем ноль
doc.rulerOrigin = [0, 0];
//  деселект все   //
doc.selection = null;

//------Черный цвет регистрэйшн-----//
RegColorBL = swatchNAME[1].color;
RegColorBL.tint = 100;
var RegBlack = RegColorBL;
//-------Белый цвет регистрэйшн-----//
RegColorWH = swatchNAME[1].color;
RegColorWH.tint = 0;
var RegWhite = RegColorWH;
//--------------Без цвета------------//
NoneColorSW = swatchNAME[0].color;
noColor = NoneColorSW;

var MakeSW = 1;
for (i = 0; i < swatchNAME.length; i++) {
    if (swatchNAME[i].name == ["C"] || swatchNAME[i].name == ["M"] || swatchNAME[i].name == ["Y"] || swatchNAME[i].name == ["K"]) {
        MakeSW = 0;
    }
}

if (MakeSW == 1) {
    Check = confirm(AddCMYK);
    if (Check == true) {
        Spot_add("C", 100, DefineCMYK(100, 0, 0, 0)); //Cyan
        Spot_add("M", 100, DefineCMYK(0, 100, 0, 0)); //Magenta
        Spot_add("Y", 100, DefineCMYK(0, 0, 100, 0)); //Yellow
        Spot_add("K", 100, DefineCMYK(0, 0, 0, 100)); //Black
    }
}

// ------- Шкалы ------- //
Check = confirm(Shkalky);
if (Check == true) {
    MakeScaleLayer = 1;
    Scale();

    for (i = 2; i < swatchNAME.length; i++) {
        BoxGroup = doc.activeLayer.groupItems.add();
        var NewPath = BoxGroup.pathItems;
        Strip();
        Start_Strip -= mm * 3;
    }

}
// ------- имена свотчей ------- //
Check = confirm(Name_Swatches);
if (Check == true) {
    MakeScaleLayer = 1;
    Scale();
    for (i = 2; i < swatchNAME.length; i++) {
        My_text();
    }
}

/////////////////////////////////////////////////////////
//                 Блок функций                        //
/////////////////////////////////////////////////////////
function Scale() {
    var MakeScaleLayer = 1;
    for (j = doc.layers.length - 1; j >= 0; j--) {
        var targetLayer = doc.layers[j];
        var layerName = targetLayer.name;
        if (layerName == "Scale") {
            MakeScaleLayer = 0;
            doc.activeLayer = doc.layers["Scale"];
        }
    }

    if (MakeScaleLayer == 1) {
        var newLayer = doc.layers.add();
        newLayer.name = "Scale"
    } //  Создаем новый слой для шкал  //
}

function Strip() {
    Tint = [];
    Tint[0] = 2;
    Tint[1] = 10;
    Tint[2] = 50;
    Tint[3] = 80;
    Tint[4] = 100;
    for (g = 0; g < Tint.length; g++) {
        Box();
    }
}

function My_text() {
    TextGroup = doc.activeLayer.groupItems.add();
    if (AIversion == "10") {
        var textRef = TextGroup.textArtItems.add();
    } else {
        var textRef = TextGroup.textFrames.add()
    }
    if (AIversion == "10") {
        textArtRange = textRef.textRange();
        textArtRange.contents = swatchNAME[i].name;
        textArtRange.size = 8;
        try {
            textArtRange.font = "PragmaticaC";
        } catch (e) {
            textArtRange.font = "ArialMT";
        }
        textArtRange.stroked = false;
        textArtRange.filled = true;
        textArtRange.fillColor = swatchNAME[i].color;
    } else {
        textRef.textRange.characterAttributes.size = 8;
        textRef.textRange.characterAttributes.stroked = false;
        textRef.textRange.characterAttributes.wrapInside = true;
        textRef.textRange.characterAttributes.fillColor = swatchNAME[i].color;
        try {
            textRef.textRange.characterAttributes.textFont = app.textFonts["PragmaticaC"];
        } catch (e) {
            textRef.textRange.characterAttributes.textFont = app.textFonts["ArialMT"];
        }
        textRef.contents = swatchNAME[i].name;
    }
    textWidth = textRef.width;
    textRef.position = Array(start, docHeight + 1.5 - mm);

    textRef.duplicate();
    if (AIversion == "10") {
        textArtRange.stroked = true;
        textArtRange.strokeWidth = 1;
        textArtRange.strokeColor = RegWhite;
    } else {
        textRef.textRange.characterAttributes.stroked = true;
        textRef.textRange.characterAttributes.strokeWidth = 1;
        textRef.textRange.characterAttributes.strokeColor = RegWhite;
    }
    textRef.position = Array(start, docHeight + 1.5 - mm);
    if (AIversion == "10") {
        start += textWidth + mm / 2;
    } else {
        start += textWidth;
    }
}

function Box() {
    box = NewPath.rectangle(mm * 3, mm * 2, mm * 3, mm * 2);

    box.stroked = true;
    box.strokeWidth = 0.1;
    box.filled = true;

    FillColor = new SpotColor();
    FillColor = swatchNAME[i].color;
    FillColor.tint = 100;
    box.strokeColor = FillColor;
    FillColor.tint = Tint[g];
    box.fillColor = FillColor;

    box.position = Array(Start_Strip, docHeight - mm);
    Start_Strip -= mm * 3;
}

function Spot_add(Name, Tint, Color) {
    var mySpots = doc.spots;
    var newSpot = mySpots.add();
    newSpot.color = Color;
    newSpot.name = Name;
    newSpot.tint = Tint;
}

function DefineCMYK(C, M, Y, K) {
    newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}