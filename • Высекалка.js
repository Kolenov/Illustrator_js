var doc = activeDocument;
//  устанавливаем ноль
doc.rulerOrigin = [0, 0];
//  деселект все
doc.selection = null;
var docHeight = doc.height;
var docWidth = doc.width;
var docName = activeDocument.name;
var mm = 2.834645;
var textRef = doc.textFrames;
var Zub = 3.175;
var z = Math.floor(docWidth / mm / Zub);
//  шаг печати
var step = (docWidth / mm).toPrecision(6);
var blackColor = DefineCMYK(0, 0, 0, 100);

//  Дата и имя документа
var dateDocNameText = SetText(10, "PragmaticaC", blackColor, "«Арт-Флекс» Днепропетровск  " + docName + " (" + TodayDate() + ")");
dateDocNameText.top = docHeight + 30;
dateDocNameText.left = 0;

//  Ширина материала
var materialHeightText = SetText(10, "PragmaticaC", blackColor, "ширина полотна " + Math.round(docHeight / mm) + " mm");
materialHeightText.position = [-materialHeightText.width / 2 - 20, docHeight / 2 + 3];
materialHeightText.rotate(90);

// Типа материала
var materialTipeText = SetText(10, "PragmaticaC", blackColor, "Z=" + z + " (" + step + " mm)");
materialTipeText.position = [docWidth / 2 - materialTipeText.width / 2 + 50, docHeight + 60];
materialTipeText = SetText(10, "PragmaticaC", blackColor, "--------------->");
materialTipeText.position = [docWidth / 2 - materialTipeText.width / 2 + 50, docHeight + 45];

var Check = confirm("Бумага?");
if (Check == true) {
    var paperTypeText = SetText(10, "PragmaticaC", blackColor, "Самоклеящаяся бумага Raflacoat RP51 HG65");
    paperTypeText.position = [docWidth / 2 - paperTypeText.width / 2 + 50, docHeight + 30];
    paperTypeText = SetText(10, "PragmaticaC", blackColor, "Подложка: 54-57mkm");
    paperTypeText.position = [docWidth / 2 - paperTypeText.width / 2 + 50, docHeight + 20];
}
else {
    var filmTypeText = SetText(10, "PragmaticaC", blackColor, "Самоклеящаяся пленка PE6850 85mkm");
    filmTypeText.position = [docWidth / 2 - filmTypeText.width / 2 + 50, docHeight + 30];
    filmTypeText = SetText(10, "PragmaticaC", blackColor, "Подложка: 54-57mkm");
    filmTypeText.position = [docWidth / 2 - filmTypeText.width / 2 + 50, docHeight + 20];
}


function DefineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}

function SetText(Size, Font, My_Fill, Contents) {
    var myText = textRef.add();
    myText.textRange.characterAttributes.size = Size;
    myText.textRange.characterAttributes.fillColor = My_Fill;
    try {
        myText.textRange.characterAttributes.textFont = app.textFonts[Font];
    }
    catch (e) {
        myText.textRange.characterAttributes.textFont = app.textFonts["ArialMT"];
    }
    myText.contents = Contents;
    return myText;
}

//  Определяем дату //
/**
 * @return {string}
 */
function TodayDate() {
    var Today = new Date();
    var Day = Today.getDate();
    var Month = Today.getMonth() + 1;
    var Year = Today.getYear();
    var PreMon = ((Month < 10) ? "0" : "");
    var PreDay = ((Day < 10) ? "0" : "");
    if (Year < 999) Year += 1900;
    return PreDay + Day + "." + PreMon + Month + "." + Year;  // можно поменять вид даты //
}
//  Определяем время //
/**
 * @return {string}
 */
function TodayTime() {
    var Today = new Date();
    var Hours = Today.getHours();
    var Minutes = Today.getMinutes();
    var PreHour = ((Hours < 10) ? "0" : "");
    var PreMin = ((Minutes < 10) ? ":0" : ":");
    return PreHour + Hours + PreMin + Minutes;
}