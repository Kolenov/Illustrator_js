'use strict';
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var docName = doc.name;
var mm = 2.834645;
var swatchNames = doc.swatches;

var makeCompensationMessage = "--- Сделай Компенсацию! ---";

// black color for registration marks
var regColorBlack = swatchNames[1].color;
regColorBlack.tint = 100;
// white color for registration marks
var regColorWhite = swatchNames[1].color;
regColorWhite.tint = 0;
// no color
var noColor = swatchNames[0].color;

doc.rulerOrigin = [0, 0];
doc.selection = null;

if (!checkCompensation()) {
    alert(makeCompensationMessage)
} else {
    if (findLayer("Sluzebka")) {
        doc.layers["Sluzebka"].remove();
    }
    var serviceFieldsLayer = doc.layers.add();
    serviceFieldsLayer.name = "Sluzebka";

    var serviceFieldsWidth = docWidth;
    var serviceFieldsHeight = docHeight + 10 * mm;

    var heightRounded = (Math.round(serviceFieldsHeight / mm * 100) / 100).toFixed(3);
    var widthRounded = (Math.round(serviceFieldsWidth / mm * 100) / 100).toFixed(3);

    //service field overall dimensions
    var overallDimensions = doc.pathItems.rectangle(serviceFieldsHeight - 5 * mm, 0, serviceFieldsWidth, serviceFieldsHeight);
    overallDimensions.filled = false;
    overallDimensions.strokeColor = regColorBlack;
    overallDimensions.strokeWidth = 0.01;

    //job information
    var jobInformationContent = "Заказчик | <Наименование работы> | " + docName + " | (" + todayDate() + " - " + todayTime() + ") | " + widthRounded + " x " + heightRounded;
    var jobInformation = makeText(jobInformationContent, 6, regColorBlack);
    jobInformation.position = [mm * 10, docHeight + 10];

    //material dimensions marks
    var materialDimensionsTop = doc.pathItems.rectangle(docHeight + 0.2, 0, mm * 20, 0.2);
    materialDimensionsTop.fillColor = regColorBlack;
    var materialDimensionsBottom = doc.pathItems.rectangle(0, 0, mm * 20, 0.2);
    materialDimensionsBottom.fillColor = regColorBlack;

    //material dimensions information
    var materialInformationContent = "Ширина материала   " + Math.round(docHeight / mm) + " mm";
    var materialInformation = makeText(materialInformationContent, 6, regColorBlack);
    materialInformation.position = [-materialInformation.width / 2 + 8, docHeight / 2 + 3];
    materialInformation.rotate(90);

    //marker of compensation
    var topLeft = doc.pathItems.rectangle(docHeight + 5 * mm, 9.9 * mm / 2, 0.2, 5 * mm);
    topLeft.fillColor = regColorBlack;
    var bottomLeft = doc.pathItems.rectangle(0, 9.9 * mm / 2, 0.2, 5 * mm);
    bottomLeft.fillColor = regColorBlack;
    var topRight = doc.pathItems.rectangle(docHeight + 5 * mm, docWidth - 9.9 * mm / 2, 0.2, 5 * mm);
    topRight.fillColor = regColorBlack;
    var bottomRight = doc.pathItems.rectangle(0, docWidth - 9.9 * mm / 2, 0.2, 5 * mm)
    bottomRight.fillColor = regColorBlack;

    guideGen(9.9 * mm / 2, 0);

    var points = [
        [[371.2578, 205.8467], [371.2578, 207.376], [370.501, 207.376]],
        [[370.501, 207.376], [363.3594, 207.376], [363.3594, 217.0322]],
        [[352.5068, 213.8936], [352.5068, 217.0322], [344.6094, 217.0322], [344.6094, 207.376], [352.5068, 207.376]],
        [[370.501, 217.0322], [370.501, 207.376]],
        [[361.8115, 207.376], [357.8613, 217.1846], [353.9121, 207.376]],
        [[343.0566, 217.0322], [343.0566, 212.2041]],
        [[360.5391, 210.5342], [355.1846, 210.5342]],
        [[390.6387, 210.7158], [385.0215, 210.7158]],
        [[390.6387, 210.7158], [390.6387, 207.376]],
        [[386.6885, 213.874], [385.0215, 210.7158]],
        [[390.6387, 210.7158], [390.6387, 217.0322], [382.7383, 217.0322], [382.7383, 210.7158], [385.0215, 210.7158]],
        [[385.0215, 210.7158], [383.3379, 207.5303]],
        [[381.0537, 207.376], [381.0537, 217.0322], [373.1543, 207.376], [373.1543, 217.0322]],
        [[292.498, 217.0322], [292.498, 207.376], [300.3975, 207.376], [300.3975, 217.0322], [292.498, 217.0322]],
        [[283.2246, 217.0322], [283.2246, 212.2041]],
        [[283.2246, 207.376], [283.2246, 212.2041]],
        [[312.416, 207.376], [312.416, 217.0322], [307.4395, 207.376], [302.7578, 217.0322], [302.7578, 207.376]],
        [[290.9023, 207.376], [283.2246, 212.2041]],
        [[322.7344, 207.376], [322.7344, 217.0322], [314.8359, 217.0322], [314.8359, 207.376]],
        [[290.9023, 217.0322], [283.2246, 212.2041]],
        [[335.1582, 207.376], [335.1582, 212.2041]],
        [[343.0566, 212.2041], [335.1582, 212.2041]],
        [[343.0566, 212.2041], [343.0566, 207.376]],
        [[335.1582, 217.0322], [335.1582, 212.2041]],
        [[332.7285, 212.2041], [324.8301, 212.2041]],
        [[324.8301, 212.2041], [324.8301, 207.376], [332.7285, 207.376]],
        [[332.7285, 217.0322], [324.8301, 217.0322], [324.8301, 212.2041]]
    ];
    var compensationSignGroup = doc.groupItems.add();
    for (j = 0; j < points.length; j++) {
        var compensationSignPath = compensationSignGroup.pathItems.add();
        compensationSignPath.setEntirePath(points[j]);
        compensationSignPath.guides = true;
    }
    compensationSignGroup.position = [8 * mm, docHeight + 10 * mm];
}

/**
 *
 * @param {string} content
 * @param {number} fontSize
 * @param fill
 * @returns {*}
 */
function makeText(content, fontSize, fill) {
    var textRef = doc.textFrames.add();
    var textRefAttributes = textRef.textRange.characterAttributes;
    textRefAttributes.size = fontSize;
    textRefAttributes.fillColor = fill;
    textRefAttributes.textFont = app.textFonts["ArialMT"];
    textRef.contents = content;
    return textRef;
}

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
function findLayer(name) {
    for (var i = 0; i < doc.layers.length; i++) {
        if (doc.layers[i].name == name) {
            return true;
        }
    }
    return false;
}

/**
 * Check if compensation is present. Key-object is rail group with width = docWidth and height = 4mm
 * @returns {boolean}
 */
function checkCompensation() {
    var step = Math.floor(docWidth / mm);
    var currentGroupWidth = null;
    var currentGroupHeight = null;

    for (var i = 0; i < doc.groupItems.length; i++) {
        currentGroupWidth = Math.floor(doc.groupItems[i].width / mm);
        currentGroupHeight = Math.floor(doc.groupItems[i].height / mm);
        if (currentGroupWidth == step && currentGroupHeight <= 4) {
            return false;
        }
    }
    return true;
}

/**
 *
 * @param startPoint
 * @param orientation
 */
function guideGen(startPoint, orientation) {
    var position = new Array(2);

    if (orientation == 0) {
        position[0] = [startPoint, 7000.0];
        position[1] = [startPoint, -7000];
    } else {
        position[0] = [-7000.0, startPoint];
        position[1] = [7000.0, startPoint];
    }
    var guideLine = doc.activeLayer.pathItems.add();

    guideLine.stroked = true;
    guideLine.filled = false;
    guideLine.guides = true;
    guideLine.setEntirePath(position);
}


/**
 * @return {string}
 */
function todayDate() {
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getYear();
    var preMon = ((month < 10) ? "0" : "");
    var preDay = ((day < 10) ? "0" : "");
    if (year < 999) year += 1900;
    return preDay + day + "." + preMon + month + "." + year; // можно поменять вид даты //
}


/**
 * @return {string}
 */
function todayTime() {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes();
    var preHour = ((hours < 10) ? "0" : "");
    var preMin = ((minutes < 10) ? ":0" : ":");
    return preHour + hours + preMin + minutes;
}