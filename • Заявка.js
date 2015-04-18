var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var msgNosel = "No selected object!";

var docPath = doc.path.fsName;
var docName = doc.name;
//alert (docPath.slice(0,3))
if (docPath.slice(0, 3) == "/\w\:\\/") {
    docsep = "";
}
else {
    docsep = "\\";
}
var pathFile = docPath + docsep + docName;
var textRef = doc.textFrames;


if (selection.length == 1) {

    var MyContents = doc.selection[0].contents;

//разбиваем на блоки строчку    
//Заказчик | <Наименование работы> | Untitled-3 | (13.07.2006 - 15:10) | 307.100 x 230.000
    BlokList = MyContents.split(/\s*\|\s*/g);
// разбиваем на блоки строчку 307.100 x 230.000
    if (BlokList.length > 4) {
        Width_Hight = BlokList[4].split(/\s\x\s/);
    }

    TextRefcounter = textRef.length;
    for (i = TextRefcounter - 1; i >= 0; i--) {
        if (textRef[i].editable) {

            var obj = textRef[i];

            if (obj.contents == "{CLIENT}{NAME}") {
                obj.contents = BlokList[0] + " " + BlokList[1];
            }
            else if (obj.contents == "{CLIENT}") {
                obj.contents = BlokList[0];
            }
            else if (obj.contents == "{NAME}") {
                obj.contents = BlokList[1];
            }
            else if (obj.contents == "{FILE}") {
                obj.contents = pathFile;
            }
            else if (obj.contents == "{DATE}") {
                if (BlokList.length > 4) {
                    obj.contents = BlokList[3];
                }
                else {
                    obj.contents = TodayDate()
                }
            }
            else if (obj.contents == "{WIDTH}") {
                obj.contents = Width_Hight[0];
            }
            else if (obj.contents == "{HEIGHT}") {
                obj.contents = Width_Hight[1];
            }
            else {
            }
        }
    }
    doc.selection[0].remove();
}
else {
    alert(msgNosel);
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


