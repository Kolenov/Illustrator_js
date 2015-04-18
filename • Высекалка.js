var AIversion = version.slice(0, 2);
var doc = activeDocument;
//  устанавливаем ноль
doc.rulerOrigin = [0, 0];
//  деселект все   //
doc.selection = null;
var docHeight = doc.height;
var docWidth = doc.width;
var docname = activeDocument.name;
var mm = 2.834645;
var TextRef = doc.textFrames;

// Добавляем надпись с датой и именем документа
var My_Black = DefineCMYK(0, 0, 0, 100);
The_text = My_text(10, "PragmaticaC", My_Black, "«Арт-Флекс» Днепропетровск  " + docname + " (" + TodayDate() + ")");
The_text.top = docHeight + 30;
The_text.left = 0;
// ширина материала
The_text = My_text(10, "PragmaticaC", My_Black, "ширина полотна " + Math.round(docHeight / mm) + " mm");
The_text.position = [-textWidth / 2 - 20, docHeight / 2 + 3];
The_text.rotate(90);
// шаг печати
var Zub = 3.175;
var z = Math.floor(docWidth / mm / Zub);

step = (docWidth / mm).toString();
Width_okr = step.substr(0, 7); //отрезаем до 7 знака


The_text = My_text(10, "PragmaticaC", My_Black, "Z=" + z + " (" + Width_okr + " mm)");
The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 60];
The_text = My_text(10, "PragmaticaC", My_Black, "--------------->");
The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 45];

Check = confirm("Бумага?");
if (Check == true) {
    The_text = My_text(10, "PragmaticaC", My_Black, "Самоклеящаяся бумага Raflacoat RP51 HG65");
    The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 30];
    The_text = My_text(10, "PragmaticaC", My_Black, "Подложка: 54-57mkm");
    The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 20];
}
else {
    The_text = My_text(10, "PragmaticaC", My_Black, "Самоклеящаяся пленка PE6850 85mkm");
    The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 30];
    The_text = My_text(10, "PragmaticaC", My_Black, "Подложка: 54-57mkm");
    The_text.position = [docWidth / 2 - textWidth / 2 + 50, docHeight + 20];
}


/////////////////////////////////////////////////////////
//                 Блок функций                        //
/////////////////////////////////////////////////////////

function DefineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}

function My_text(Size, Font, My_Fill, Contents) {
        myText = TextRef.add();
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