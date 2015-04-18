var AIversion = version.slice(0, 2);
var doc = activeDocument;
// ------- деселект все ------- //
doc.selection = null;
var docHeight = doc.height;
var docWidth = doc.width;
//var docname = doc.name;
var mm = 2.834645;
var railGroup = doc.activeLayer.groupItems.add();
var swatchNAME = doc.swatches;

if (AIversion == "10") {
	//------Черный цвет регистрэйшн-----//
	newSpotColor = new SpotColor();
	newSpotColor.spot = doc.spots["[Registration]"];
	RegBlack = new Color();
	newSpotColor.tint = 100;
	RegBlack.spot = newSpotColor;
	//-------Белый цвет регистрэйшн-----//
	RegWhite = new Color();
	newSpotColor.tint = 0;
	RegWhite.spot = newSpotColor;
	//--------------Без цвета------------//
	NoneColorSW = swatchNAME["[None]"].color;
	noColor = new Color();
	noColor = NoneColorSW;
} else { // для CS2
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
}

// ------- устанавливаем ноль -------  //
doc.rulerOrigin = [0, 0];

// ------- рисуем верхнюю рельсу -------  //
Line(docHeight - mm, 0, docWidth, mm * 2, RegBlack);

// ------- рисуем центральную метку -------//
Line(docHeight - mm, docWidth / 2 - mm * 2, mm * 4, mm * 2, RegWhite);
Line(docHeight - mm * 2 + 0.125, docWidth / 2 - mm * 2, mm * 4, 0.25, RegBlack);
Line(docHeight - mm, docWidth / 2 - 0.125, 0.25, mm * 2, RegBlack);

// ------- рисуем боковые метки ------- //
Line(docHeight - mm * 4 + 0.4, 0, mm * 5, 0.4, RegBlack);
Line(docHeight - mm, mm * 5 - 0.4, 0.4, mm * 3, RegBlack);
Line(docHeight, mm * 5 - 0.4, 0.4, mm, RegWhite);
Line(docHeight - mm * 2, 0, mm * 5 - 0.4, mm * 2 - 0.4, RegWhite);
Line(docHeight - mm * 3 + 0.2, 0, mm * 2, 0.4, RegBlack);

Line(docHeight - mm * 4 + 0.4, docWidth - mm * 5, mm * 5, 0.4, RegBlack);
Line(docHeight - mm, docWidth - mm * 5, 0.4, mm * 3, RegBlack);
Line(docHeight, docWidth - mm * 5, 0.4, mm, RegWhite);
Line(docHeight - mm * 2, docWidth - mm * 5 + 0.4, mm * 5 - 0.4, mm * 2 - 0.4, RegWhite);
Line(docHeight - mm * 3 + 0.2, docWidth - mm * 2, mm * 2, 0.4, RegBlack);

// ------- рисуем нижнюю рельсу ------- //
railGroup.duplicate();
railGroup.rotate(180);
railGroup.position = [0, mm * 4];

/////////////////////////////////////////////
//             Блок функций                //
/////////////////////////////////////////////
function Line(Top, Left, Width, Height, my_Fill) {
	pathRef = railGroup.pathItems.rectangle(Top, Left, Width, Height);
	pathRef.stroked = false;
	pathRef.filled = true;
	pathRef.fillColor = my_Fill;
}