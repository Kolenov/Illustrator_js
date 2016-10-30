"use strict";
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var msgNoSelected = "No selected object!";
var docPath = doc.path.fsName;
var docName = doc.name;

if (docPath.slice(0, 3) == "/\w\:\\/") {
    var docSeparator = "";
}
else {
    docSeparator = "\\";
}
var pathFile = docPath + docSeparator + docName;
var textRef = doc.textFrames;

if (selection.length == 1) {

    var textSourceContent = doc.selection[0].contents;

    /*
     разбиваем на блоки строчку
     Заказчик | <Наименование работы> | Untitled-3 | (13.07.2006 - 15:10) | 307.100 x 230.000
     */
    var blocksList = textSourceContent.split(/\s*\|\s*/g);
    // разбиваем на блоки строчку 307.100 x 230.000
    if (blocksList.length > 4) {
        var widthHight = blocksList[4].split(/\s*[x]\s*/g);
    }

    // TODO Check if patterns are exist
    var textRefCounter = textRef.length;
    for (var i = textRefCounter - 1; i >= 0; i--) {
        if (textRef[i].editable) {

            var obj = textRef[i];

            if (obj.contents == "{CLIENT}{NAME}") {
                obj.contents = blocksList[0] + " " + blocksList[1];
            }
            else if (obj.contents == "{CLIENT}") {
                obj.contents = blocksList[0];
            }
            else if (obj.contents == "{NAME}") {
                obj.contents = blocksList[1];
            }
            else if (obj.contents == "{FILE}") {
                obj.contents = pathFile;
            }
            else if (obj.contents == "{DATE}") {
                if (blocksList.length > 4) {
                    obj.contents = blocksList[3];
                }
                else {
                    obj.contents = todayDate()
                }
            }
            else if (obj.contents == "{WIDTH}") {
                obj.contents = widthHight[0];
            }
            else if (obj.contents == "{HEIGHT}") {
                obj.contents = widthHight[1];
            }
            else {
            }
        }
    }
    doc.selection[0].remove();
}
else {
    alert(msgNoSelected);
}

//  Определяем дату //
/**
 * @return {string}
 */
function todayDate() {
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
function todayTime() {
    var Today = new Date();
    var Hours = Today.getHours();
    var Minutes = Today.getMinutes();
    var PreHour = ((Hours < 10) ? "0" : "");
    var PreMin = ((Minutes < 10) ? ":0" : ":");
    return PreHour + Hours + PreMin + Minutes;
}


