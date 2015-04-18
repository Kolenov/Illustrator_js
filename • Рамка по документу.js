var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var pathRef;

//  устанавливаем ноль   //
doc.rulerOrigin = [0, 0];

//  деселект все   //
doc.selection = null;

//  рисуем прямоугольник с отступами по 1 мм   //
var My_Color = DefineCMYK(0, 0, 0, 100);
pathRef = doc.activeLayer.pathItems.rectangle(docHeight, 0, docWidth, docHeight);
pathRef.filled = false;
pathRef.stroked = true;
pathRef.strokeWidth = 0.1;
pathRef.strokeColor = My_Color;
pathRef.selected = true;


function DefineCMYK(C, M, Y, K) {
    var newCMYKColor = new CMYKColor();
    newCMYKColor.black = K;
    newCMYKColor.cyan = C;
    newCMYKColor.magenta = M;
    newCMYKColor.yellow = Y;
    return newCMYKColor;
}