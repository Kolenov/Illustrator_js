var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var pathRef;
var mm = 2.834645;
var swatchNAME = doc.swatches;

//------Gray colour Registration 10%-----//
try {RegColorBL = swatchNAME["[Registration]"].color;}
catch (e) {RegColorBL = swatchNAME["[Совмещение]"].color;}
RegColorBL.tint = 10;
MyGray = RegColorBL;

//  set up zero   //
doc.rulerOrigin = [0, 0];
//  deselect all   //
doc.selection = null;
//  Check the layer Registration10. If this is - removing  //
countOfLayers = doc.layers.length;
	for (j=countOfLayers-1; j>=0; j--)
	{
		var targetLayer = doc.layers[j];
		var layerName = targetLayer.name;
		if (layerName == "Registration10")
		{doc.layers[j].remove();}
	}
//  Create the layer Registration10  //
var newLayer = doc.layers.add();
newLayer.name = "Registration10";
newLayer.zOrder(ZOrderMethod.SENDTOBACK);
//  Draw a rectangle  with fillColor Registration 10%  //
pathRef = doc.activeLayer.pathItems.rectangle(docHeight-mm, 0, docWidth, docHeight-2*mm);
pathRef.filled = true;
pathRef.fillColor = MyGray;
pathRef.stroked = false;
pathRef.selected=true;