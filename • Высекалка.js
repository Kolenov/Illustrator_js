var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var docName = doc.name;
var mm = 2.834645;
var Zub = 3.175;
var z = Math.floor(docWidth / mm / Zub);

var step = (docWidth / mm).toPrecision(6);
var blackColor = defineCMYK(0, 0, 0, 100);

doc.rulerOrigin = [0, 0];
doc.selection = null;

// current date and document name
var dateDocNameTextContents = "«Арт-Флекс» Днепропетровск  " + docName + " (" + todayDate() + ")";
var dateDocNameText = makeText(dateDocNameTextContents, 10, blackColor);
dateDocNameText.top = docHeight + 30;
dateDocNameText.toLeft = 0;

// material height
var materialHeightTextContents = "ширина полотна " + Math.round(docHeight / mm) + " mm";
var materialHeightText = makeText(materialHeightTextContents, 10, blackColor);
materialHeightText.position = [-materialHeightText.width / 2 - 20, docHeight / 2 + 3];
materialHeightText.rotate(90);

// material type
var materialTypeTextContents = "Z=" + z + " (" + step + " mm)";
var materialTypeText = makeText(materialTypeTextContents, 10, blackColor);
materialTypeText.position = [docWidth / 2 - materialTypeText.width / 2 + 50, docHeight + 60];

var arrowText = makeText("--------------->", 10, blackColor);
arrowText.position = [docWidth / 2 - arrowText.width / 2 + 50, docHeight + 45];

var Check = confirm("Бумага?");
if (Check == true) {
    var paperTypeText = makeText("Самоклеящаяся бумага Raflacoat RP51 HG65", 10, blackColor);
    paperTypeText.position = [docWidth / 2 - paperTypeText.width / 2 + 50, docHeight + 30];

    var paperBaseText = makeText("Подложка: 54-57mkm", 10, blackColor);
    paperBaseText.position = [docWidth / 2 - paperBaseText.width / 2 + 50, docHeight + 20];
}
else {
    var filmTypeText = makeText("Самоклеящаяся пленка PE6850 85mkm", 10, blackColor);
    filmTypeText.position = [docWidth / 2 - filmTypeText.width / 2 + 50, docHeight + 30];

    var filmBaseText = makeText("Подложка: 54-57mkm", 10, blackColor);
    filmBaseText.position = [docWidth / 2 - filmBaseText.width / 2 + 50, docHeight + 20];
}

/**
 *
 * @param {number} C
 * @param {number} M
 * @param {number} Y
 * @param {number} K
 * @returns {CMYKColor}
 */
function defineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
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