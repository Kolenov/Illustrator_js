﻿var AIversion = version.slice(0,2);
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var docname = activeDocument.name;
var mm = 2.834645;
var TextRef = doc.textFrames;

doc.rulerOrigin = [0, 0]; //  устанавливаем ноль
doc.selection = null; //  деселект все

// Добавляем надпись с датой и именем документа
var My_Black = DefineCMYK (0, 0, 0, 100);
The_text = My_text (10, "PragmaticaC", My_Black, "«Арт-Флекс» Днепропетровск  "+docname+" ("+TodayDate()+")");
The_text.top = docHeight+30;
The_text.left = 0;
// ширина материала
The_text = My_text (10, "PragmaticaC", My_Black, "ширина полотна " + Math.round(docHeight/mm) + " mm");
The_text.position = Array(-textWidth/2-20, docHeight/2+3);
The_text.rotate(90);
// шаг печати
var Zub = 3.175;
var z = Math.floor(docWidth/mm/Zub);
var step = (docWidth/mm).toPrecision(6);

The_text = My_text (10, "PragmaticaC", My_Black, "Z=" + z + " ("+step+" mm)");
The_text.position = Array(docWidth/2-textWidth/2+50, docHeight+60);
The_text = My_text (10, "PragmaticaC", My_Black, "--------------->");
The_text.position = Array(docWidth/2-textWidth/2+50, docHeight+45);

Check = confirm("Is it Paper?");
if(Check == true)
{
    The_text = My_text (10, "PragmaticaC", My_Black, "Самоклеящаяся бумага");
    The_text.position = Array(docWidth/2-textWidth/2+50, docHeight+30);
}
else
{
    The_text = My_text (10, "PragmaticaC", My_Black, "Самоклеящаяся пленка");
    The_text.position = Array(docWidth/2-textWidth/2+50, docHeight+30);
}

/////////////////////////////////////////////////////////
//                 Блок функций                        //
/////////////////////////////////////////////////////////

function DefineCMYK (C, M, Y, K)
{
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}

function My_text (Size, Font, My_Fill, Contents)
{
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
    //textRef.top = Top;
    //textRef.left = Left;
    //textRef.rotate(Angle);
    textWidth = myText.width;
    return myText;
    return textWidth;
}
//  Определяем дату //
function TodayDate()
{
    var Today = new Date();
    var Day = Today.getDate();
    var Month = Today.getMonth() + 1;
    var Year = Today.getYear();
    var PreMon = ((Month < 10) ? "0" : "");
    var PreDay = ((Day < 10) ? "0" : "");
    if(Year < 999) Year += 1900;
    return PreDay+Day+"."+PreMon+Month+"."+Year;  // можно поменять вид даты //
}
//  Определяем время //
function TodayTime()
{
    var Today = new Date();
    var Hours = Today.getHours();
    var Minutes = Today.getMinutes();
    var PreHour  = ((Hours < 10) ? "0" : "");
    var PreMin  = ((Minutes < 10) ? ":0" : ":");
    return PreHour+Hours+PreMin+Minutes;
}