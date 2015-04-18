
if (documents.length > 0)
{
var AIversion = version.slice(0,2);
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var swatchNAME = doc.swatches;
var mm = 72/25.4;
var start = doc.width/2-mm*20; //начало первого стрипа

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
}
else { // для CS2
//------Черный цвет регистрэйшн-----//
try {RegColorBL = swatchNAME["[Registration]"].color;}
catch (e) {RegColorBL = swatchNAME["[Совмещение]"].color;}
RegColorBL.tint = 100;
var RegBlack = RegColorBL;
//-------Белый цвет регистрэйшн-----//
try {RegColorWH = swatchNAME["[Registration]"].color;}
catch (e) {RegColorWH = swatchNAME["[Совмещение]"].color;}
RegColorWH.tint = 0;
var RegWhite = RegColorWH;
//--------------Без цвета------------//
try {NoneColorSW = swatchNAME["[None]"].color;}
catch (e) {NoneColorSW = swatchNAME["[Нет]"].color;}
noColor = NoneColorSW;
}



for (i = 2; i < swatchNAME.length; i++)
	{
		Mira();
		start = start + mm*4
	}
}


function Mira()
{

	var MiraGroup = doc.groupItems.add();


//-----------------------------------------
var MiraFon = MiraGroup.pathItems.add();
var pointsFon = [[473.4189, 243.7412],
				 [464.9141, 243.7412],
				 [464.9141, 252.2451],
				 [473.4189, 252.2451]];
MiraFon.setEntirePath(pointsFon);
MiraFon.closed = true;

// цвет фона миры
MiraFon.stroked = false;
MiraFon.filled = true;
MiraFon.fillColor = RegWhite;
//-----------------------------------------


points = [];
points [2] = [[465.6523, 252.2451],
			  [464.9141, 252.2451],
			  [464.9141, 252.2031],
			  [469.1221, 247.9922]];

points [3] = [[466.9531, 252.2451],
			  [466.3467, 252.2451],
			  [469.1221, 247.9922]];

points [4] = [[467.9951, 252.2451],
			  [467.5186, 252.2451],
			  [469.1221, 247.9922]];

points [5] = [[468.9053, 252.2451],
			  [468.5156, 252.2451],
			  [469.1221, 247.9922]];

points [6] = [[469.8594, 252.2451],
			  [469.4258, 252.2451],
			  [469.1221, 247.9922]];

points [7] = [[470.8145, 252.2451],
			  [470.3379, 252.2451],
			  [469.1221, 247.9922]];

points [8] = [[471.9854, 252.2451],
			  [471.4229, 252.2451],
			  [469.1221, 247.9922]];

points [9] = [[472.7676, 252.2451],
			  [473.4189, 252.2451],
			  [473.4189, 252.1592],
			  [469.1221, 247.9922]];

points [10] = [[473.4189, 250.6982],
			   [473.4189, 251.2988],
			   [469.1221, 247.9922]];

points [11] = [[473.4189, 249.5811],
			   [473.4189, 250.0537],
			   [469.1221, 247.9922]];

points [12] = [[473.4189, 248.6367],
			   [473.4189, 249.0234],
			   [469.1221, 247.9922]];

points [13] = [[473.4189, 247.6914],
			   [473.4189, 248.1221],
			   [469.1221, 247.9922]];

points [14] = [[473.4189, 246.7471],
			   [473.4189, 247.2188],
			   [469.1221, 247.9922]];

points [15] = [[473.4189, 245.7168],
			   [473.4189, 246.2314],
			   [469.1221, 247.9922]];

points [16] = [[473.4189, 244.3838],
			   [473.4189, 245.0713],
			   [469.1221, 247.9922]];

points [17] = [[472.4629, 243.7412],
			   [473.2451, 243.7412],
			   [469.1221, 247.9922]];

points [18] = [[471.1621, 243.7412],
			   [471.7686, 243.7412],
			   [469.1221, 247.9922]];

points [19] = [[470.1641, 243.7412],
			   [470.6426, 243.7412],
			   [469.1221, 247.9922]];

points [20] = [[469.2539, 243.7412],
			   [469.6875, 243.7412],
			   [469.1221, 247.9922]];

points [21] = [[468.3428, 243.7412],
			   [468.7754, 243.7412],
			   [469.1221, 247.9922]];

points [22] = [[467.3867, 243.7412],
			   [467.8652, 243.7412],
			   [469.1221, 247.9922]];

points [23] = [[466.2588, 243.7412],
			   [466.8232, 243.7412],
			   [469.1221, 247.9922]];

points [24] = [[465.5225, 243.7412],
			   [464.9141, 243.7412],
			   [464.9141, 243.9551],
			   [469.1221, 247.9922]];

points [25] = [[464.9141, 245.373 ],
			   [464.9141, 244.7715],
			   [469.1221, 247.9922]];

points [26] = [[464.9141, 246.4463],
			   [464.9141, 245.9746],
			   [469.1221, 247.9922]];

points [27] = [[464.9141, 247.3916],
			   [464.9141, 246.9619],
			   [469.1221, 247.9922]];

points [28] = [[464.9141, 248.251 ],
			   [464.9141, 247.8203],
			   [469.1221, 247.9922]];

points [29] = [[464.9141, 249.1084],
			   [464.9141, 248.7227],
			   [469.1221, 247.9922]];

points [30] = [[464.9141, 250.1406],
			   [464.9141, 249.624 ],
			   [469.1221, 247.9922]];

points [31] = [[464.9141, 251.3857],
			   [464.9141, 250.7422],
			   [469.1221, 247.9922]];

	for (j = 2; j < points.length; j++)
		{
			var MiraPath = MiraGroup.pathItems.add();
			MiraPath.setEntirePath(points [j]);
         MiraPath.closed = true;
			MiraPath.stroked = false;
			MiraPath.filled = true;
			MiraPath.fillColor = swatchNAME[i].color;
		}

MiraGroup.position = Array(start, docHeight-mm);
}