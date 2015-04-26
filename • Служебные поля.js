var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var docname = activeDocument.name;
var mm = 72 / 25.4;
var swatchNAME = doc.swatches;
var allGroups = doc.groupItems;
var TextRef = doc.textFrames;

    //-------Белый цвет регистрэйшн-----//
    RegColorWH = swatchNAME[1].color;
    RegColorWH.tint = 0;
    var RegWhite = RegColorWH;
    //------Черный цвет регистрэйшн-----//
    RegColorBL = swatchNAME[1].color;
    RegColorBL.tint = 100;
    var MyBlack = RegColorBL;

    //--------------Без цвета------------//
    try {
        NoneColorSW = swatchNAME["[None]"].color;
    }
    catch (e) {
        NoneColorSW = swatchNAME["[Нет]"].color;
    }
    noColor = NoneColorSW;

//  устанавливаем ноль //
doc.rulerOrigin = [0, 0];
//  деселект все   //
doc.selection = null;

// Проверка наличия компенсации сборки -9,9мм (ключевой объект - рельса)
var _go = 1;
var step = Math.floor(docWidth / mm);
for (i = 0; i < allGroups.length; i++) {
    var _GroupWidth = Math.floor(allGroups[i].width / mm);
    var _GroupHeight = Math.floor(allGroups[i].height / mm);
    if (_GroupWidth == step && _GroupHeight <= 4) {
        _go = 0;
    }
}
if (_go == 0) {
    alert('--- Сделай Компенсацию! ---')
} else {
    //  Проверяем наличие слоя служебных надписей и если есть удаляем  //
    countOfLayers = doc.layers.length;
    for (j = countOfLayers - 1; j >= 0; j--) {
        var targetLayer = doc.layers[j];
        var layerName = targetLayer.name;
        if (layerName == "Sluzebka") {
            doc.layers[j].remove();
        }
    }
    //  Создаем новый слой для служебных надписей  //
    var newLayer = doc.layers.add();
    newLayer.name = "Sluzebka";
    //определяем габариты сборки//
    var Width = docWidth;
    var Height = docHeight + 10 * mm;

    var Height_okr = (Math.round(Height / mm * 100) / 100).toFixed(3);
    var Width_okr = (Math.round(Width / mm * 100) / 100).toFixed(3);

    My_Line(Height - 5 * mm, 0, Width, Height, noColor, MyBlack, 0.01);
    //Добавляем надпись с датой и именем документа //
    TheText = My_text(6, "PragmaticaC", MyBlack, "Заказчик | <Наименование работы> | " + docname + " | (" + TodayDate() + " - " + TodayTime() + ") | " + Width_okr + " x " + Height_okr);
    TheText.position = [mm * 10, docHeight + 10];
    //Ширина материала //
    My_Line(docHeight + 0.2, 0, mm * 20, 0.2, MyBlack, noColor, 0);
    My_Line(0, 0, mm * 20, 0.2, MyBlack, noColor, 0);
    //My_Line (docHeight, 3*mm, 0.2, docHeight/2-50, MyBlack, noColor, 0);
    //My_Line (docHeight/2-50, 3*mm, 0.2, docHeight/2-50, MyBlack, noColor, 0);
    TheText = My_text(6, "PragmaticaC", MyBlack, "Ширина материала   " + Math.round(docHeight / mm) + " mm");
    TheText.position = [-TheText.width / 2 + 8, docHeight / 2 + 3];
    TheText.rotate(90);
    //Маркер компенсации//
    My_Line(docHeight + 5 * mm, 9.9 * mm / 2, 0.2, 5 * mm, MyBlack, noColor, 0);
    My_Line(0, 9.9 * mm / 2, 0.2, 5 * mm, MyBlack, noColor, 0);
    My_Line(docHeight + 5 * mm, docWidth - 9.9 * mm / 2, 0.2, 5 * mm, MyBlack, noColor, 0);
    My_Line(0, docWidth - 9.9 * mm / 2, 0.2, 5 * mm, MyBlack, noColor, 0);
    guideGen(9.9 * mm / 2, 0);
    points = [];
    points[0] = [[371.2578, 205.8467], [371.2578, 207.376], [370.501, 207.376]];
    points[1] = [[370.501, 207.376], [363.3594, 207.376], [363.3594, 217.0322]];
    points[2] = [[352.5068, 213.8936], [352.5068, 217.0322], [344.6094, 217.0322], [344.6094, 207.376], [352.5068, 207.376]];
    points[3] = [[370.501, 217.0322], [370.501, 207.376]];
    points[4] = [[361.8115, 207.376], [357.8613, 217.1846], [353.9121, 207.376]];
    points[5] = [[343.0566, 217.0322], [343.0566, 212.2041]];
    points[6] = [[360.5391, 210.5342], [355.1846, 210.5342]];
    points[7] = [[390.6387, 210.7158], [385.0215, 210.7158]];
    points[8] = [[390.6387, 210.7158], [390.6387, 207.376]];
    points[9] = [[386.6885, 213.874], [385.0215, 210.7158]];
    points[10] = [[390.6387, 210.7158], [390.6387, 217.0322], [382.7383, 217.0322], [382.7383, 210.7158], [385.0215, 210.7158]];
    points[11] = [[385.0215, 210.7158], [383.3379, 207.5303]];
    points[12] = [[381.0537, 207.376], [381.0537, 217.0322], [373.1543, 207.376], [373.1543, 217.0322]];
    points[13] = [[292.498, 217.0322], [292.498, 207.376], [300.3975, 207.376], [300.3975, 217.0322], [292.498, 217.0322]];
    points[14] = [[283.2246, 217.0322], [283.2246, 212.2041]];
    points[15] = [[283.2246, 207.376], [283.2246, 212.2041]];
    points[16] = [[312.416, 207.376], [312.416, 217.0322], [307.4395, 207.376], [302.7578, 217.0322], [302.7578, 207.376]];
    points[17] = [[290.9023, 207.376], [283.2246, 212.2041]];
    points[18] = [[322.7344, 207.376], [322.7344, 217.0322], [314.8359, 217.0322], [314.8359, 207.376]];
    points[19] = [[290.9023, 217.0322], [283.2246, 212.2041]];
    points[20] = [[335.1582, 207.376], [335.1582, 212.2041]];
    points[21] = [[343.0566, 212.2041], [335.1582, 212.2041]];
    points[22] = [[343.0566, 212.2041], [343.0566, 207.376]];
    points[23] = [[335.1582, 217.0322], [335.1582, 212.2041]];
    points[24] = [[332.7285, 212.2041], [324.8301, 212.2041]];
    points[25] = [[324.8301, 212.2041], [324.8301, 207.376], [332.7285, 207.376]];
    points[26] = [[332.7285, 217.0322], [324.8301, 217.0322], [324.8301, 212.2041]];
    var KompensGroup = doc.groupItems.add();
    for (j = 0; j < points.length; j++) {
        var KompensPath = KompensGroup.pathItems.add();
        KompensPath.setEntirePath(points[j]);
        KompensPath.guides = true;
    }
    KompensGroup.position = [8 * mm, docHeight + 10 * mm];
}

function My_Line(Top, Left, Width, Height, My_Fill, My_Stroke, str_Width) {
    var pathRef = doc.pathItems.rectangle(Top, Left, Width, Height);
    pathRef.filled = true;
    pathRef.fillColor = My_Fill;
    pathRef.stroked = true;
    pathRef.strokeColor = My_Stroke;
    pathRef.strokeWidth = str_Width;
}

function My_text(Size, Font, My_Fill, Contents) {
        var myText = TextRef.add();
        myText.textRange.characterAttributes.size = Size;
        myText.textRange.characterAttributes.fillColor = My_Fill;
        try {
            myText.textRange.characterAttributes.textFont = app.textFonts[Font];
        } catch (e) {
            myText.textRange.characterAttributes.textFont = app.textFonts["ArialMT"];
        }
        myText.contents = Contents;
        return myText;
}

function guideGen(p, sw) {
    var pos = new Array(2);

    if (sw == 0) {
        pos[0] = [p, 7000.0];
        pos[1] = [p, -7000];
    } else {
        pos[0] = [-7000.0, p];
        pos[1] = [7000.0, p];
    }
    var line = activeDocument.activeLayer.pathItems.add();

    line.stroked = true;
    line.filled = false;
    line.guides = true;
    line.setEntirePath(pos);
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
    return PreDay + Day + "." + PreMon + Month + "." + Year; // можно поменять вид даты //
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