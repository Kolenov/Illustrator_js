"use strict";
if (documents.length > 0) {
    var doc = activeDocument;
    var docHeight = doc.height;
    var docWidth = doc.width;
    var swatchNames = doc.swatches;
    var lastSpot = doc.spots.length - 1;
    var mm = 72 / 25.4;
    var startPoint = doc.width / 2 - mm * 20; //начало первого стрипа

    // black color for registration marks
    var regColorBlack = new SpotColor();
    regColorBlack.spot = doc.spots[lastSpot];
    regColorBlack.tint = 100;

    // white color for registration marks
    var regColorWhite = new SpotColor();
    regColorWhite.spot = doc.spots[lastSpot];
    regColorWhite.tint = 0;
    // no color
    var noColor = new NoColor();

    var pointsForMira = [];
    pointsForMira [0] = [[465.6523, 252.2451],
        [464.9141, 252.2451],
        [464.9141, 252.2031],
        [469.1221, 247.9922]];

    pointsForMira [1] = [[466.9531, 252.2451],
        [466.3467, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [2] = [[467.9951, 252.2451],
        [467.5186, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [3] = [[468.9053, 252.2451],
        [468.5156, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [4] = [[469.8594, 252.2451],
        [469.4258, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [5] = [[470.8145, 252.2451],
        [470.3379, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [6] = [[471.9854, 252.2451],
        [471.4229, 252.2451],
        [469.1221, 247.9922]];

    pointsForMira [7] = [[472.7676, 252.2451],
        [473.4189, 252.2451],
        [473.4189, 252.1592],
        [469.1221, 247.9922]];

    pointsForMira [8] = [[473.4189, 250.6982],
        [473.4189, 251.2988],
        [469.1221, 247.9922]];

    pointsForMira [9] = [[473.4189, 249.5811],
        [473.4189, 250.0537],
        [469.1221, 247.9922]];

    pointsForMira [10] = [[473.4189, 248.6367],
        [473.4189, 249.0234],
        [469.1221, 247.9922]];

    pointsForMira [11] = [[473.4189, 247.6914],
        [473.4189, 248.1221],
        [469.1221, 247.9922]];

    pointsForMira [12] = [[473.4189, 246.7471],
        [473.4189, 247.2188],
        [469.1221, 247.9922]];

    pointsForMira [13] = [[473.4189, 245.7168],
        [473.4189, 246.2314],
        [469.1221, 247.9922]];

    pointsForMira [14] = [[473.4189, 244.3838],
        [473.4189, 245.0713],
        [469.1221, 247.9922]];

    pointsForMira [15] = [[472.4629, 243.7412],
        [473.2451, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [16] = [[471.1621, 243.7412],
        [471.7686, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [17] = [[470.1641, 243.7412],
        [470.6426, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [18] = [[469.2539, 243.7412],
        [469.6875, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [19] = [[468.3428, 243.7412],
        [468.7754, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [20] = [[467.3867, 243.7412],
        [467.8652, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [21] = [[466.2588, 243.7412],
        [466.8232, 243.7412],
        [469.1221, 247.9922]];

    pointsForMira [22] = [[465.5225, 243.7412],
        [464.9141, 243.7412],
        [464.9141, 243.9551],
        [469.1221, 247.9922]];

    pointsForMira [23] = [[464.9141, 245.373],
        [464.9141, 244.7715],
        [469.1221, 247.9922]];

    pointsForMira [24] = [[464.9141, 246.4463],
        [464.9141, 245.9746],
        [469.1221, 247.9922]];

    pointsForMira [25] = [[464.9141, 247.3916],
        [464.9141, 246.9619],
        [469.1221, 247.9922]];

    pointsForMira [26] = [[464.9141, 248.251],
        [464.9141, 247.8203],
        [469.1221, 247.9922]];

    pointsForMira [27] = [[464.9141, 249.1084],
        [464.9141, 248.7227],
        [469.1221, 247.9922]];

    pointsForMira [28] = [[464.9141, 250.1406],
        [464.9141, 249.624],
        [469.1221, 247.9922]];

    pointsForMira [29] = [[464.9141, 251.3857],
        [464.9141, 250.7422],
        [469.1221, 247.9922]];

    (function () {
        for (var i = 2; i < swatchNames.length; i++) {
            makeMira(swatchNames[i]);
            startPoint = startPoint + mm * 4;
        }
    })();
}

/**
 *
 * @param {Swatch} swatch
 */
function makeMira(swatch) {
    var miraGroup = doc.groupItems.add();
    var miraFon = miraGroup.pathItems.add();
    var pointsForFon = [[473.4189, 243.7412],
        [464.9141, 243.7412],
        [464.9141, 252.2451],
        [473.4189, 252.2451]];
    miraFon.setEntirePath(pointsForFon);
    miraFon.closed = true;
    miraFon.stroked = false;
    miraFon.filled = true;
    miraFon.fillColor = regColorWhite;

    for (var i = 0; i < pointsForMira.length; i++) {
        var miraPath = miraGroup.pathItems.add();
        miraPath.setEntirePath(pointsForMira [i]);
        miraPath.closed = true;
        miraPath.stroked = false;
        miraPath.filled = true;
        miraPath.fillColor = swatch.color;
    }

    miraGroup.position = [startPoint, docHeight - mm];
}
