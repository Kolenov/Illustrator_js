var doc = activeDocument;
var docHeight = doc.height;
var lastSpot = doc.spots.length - 1;
var docWidth = doc.width;
var mm = 2.834645;

// black color for registration marks
var regColorGray = new SpotColor();
regColorGray.spot = doc.spots[lastSpot];
regColorGray.tint = 10;

doc.rulerOrigin = [0, 0];
doc.selection = null;

//  Check the layer Registration10. If this is - removing  //
var countOfLayers = doc.layers.length;
for (var i = countOfLayers - 1; i >= 0; i--) {
    var targetLayer = doc.layers[i];
    var layerName = targetLayer.name;
    if (layerName === "Registration10") {
        doc.layers[i].remove();
    }
}
//  Create the layer Registration10  //
var registrationLayer = doc.layers.add();
registrationLayer.name = "Registration10";
registrationLayer.zOrder(ZOrderMethod.SENDTOBACK);

//  Draw a rectangle  with fillColor Registration 10%  //
var pathRef = doc.activeLayer.pathItems.rectangle(docHeight - mm, 0, docWidth, docHeight - 2 * mm);
pathRef.filled = true;
pathRef.fillColor = regColorGray;
pathRef.stroked = false;
pathRef.selected = true;