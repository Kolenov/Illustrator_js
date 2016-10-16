var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var swatchNames = doc.swatches;
var startPoint = -29.8 * mm;
var countOfLayers = doc.layers.length;

doc.selection = null;
doc.rulerOrigin = [0, 0];

// check if layer "Servo" is present
for (var i = countOfLayers - 1; i >= 0; --i) {
    if (doc.layers[i].name == "Servo") {
        doc.layers[i].remove();
    }
}

// make new layer for servo-marks
var servoLayer = doc.layers.add();
servoLayer.name = "Servo";

var servoGroup = doc.activeLayer.groupItems.add();

// make servo-marks from activeDocument.swatches container
// exclude [None] - index 0 and [Registration] - index 1 items.
(function () {
    var counter = 0;
    for (var i = 2; i < swatchNames.length; ++i) {
        // add start code marker for sensotech system
        if (i == 2) {
            makeBox(4 * mm, -2.5 * mm, 2.5 * mm, 4 * mm, swatchNames[2].color);
            makeBox(4 * mm, -2.5 * mm - 10 * mm, 5 * mm, 4 * mm, swatchNames[2].color);
            makeBox(4 * mm, -2.5 * mm - 10 * mm - 5 * mm, 2.5 * mm, 4 * mm, swatchNames[2].color);
            continue;
        } else {
            // add base mark after start code and after every 2 colors
            if (isEven(counter)) {
                makeMarker(swatchNames[2].color);
                startPoint -= 13 * mm;
            }
            makeMarker(swatchNames[i].color);
            ++counter;
            startPoint -= 13 * mm;
        }
        // add last base mark if colors is even
        if (i == swatchNames.length - 1 && isEven(i)) {
            makeMarker(swatchNames[2].color);
            startPoint -= 13 * mm;
        }
    }
})();

servoGroup.position = [docWidth - servoGroup.width - 15 * mm, docHeight + 3 * mm];

/**
 *
 * @param {Number} number
 * @returns {boolean}
 */
function isEven(number) {
    return !(number % 2);
}

/**
 *
 * @param {Number} top
 * @param {Number} left
 * @param {Number} width
 * @param {Number} height
 * @param {Color} fill
 */
function makeBox(top, left, width, height, fill) {
    pathRef = servoGroup.pathItems.rectangle(top, left, width, height);
    pathRef.stroked = false;
    pathRef.filled = true;
    pathRef.fillColor = fill;
}
/**
 *
 * @param {Color} fill
 */
function makeMarker(fill) {
    var marker = servoGroup.pathItems.add();
    var points = [[-12.189, 0], [-5.66943, 11.3384], [0, 11.3384], [0, 0]];
    marker.setEntirePath(points);
    marker.closed = true;
    marker.stroked = false;
    marker.filled = true;
    marker.fillColor = fill;
    marker.position = [startPoint, 4 * mm];
}
