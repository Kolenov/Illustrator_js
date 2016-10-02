var doc = activeDocument;
var docWidth = doc.width;
var mm = 2.834645;
var prePressTableFile = new File("c://forma.ai");

if (documents.length > 0) {
    doc.rulerOrigin = [0, 0];

    if (doc.activeLayer.visible && !doc.activeLayer.locked) {
        importedGroup = doc.activeLayer.groupItems.createFromFile(prePressTableFile);
        importedGroup.position = [docWidth / 2 - 96 * mm, 60 * mm];
    } else {
        alert("Set Layer " + doc.activeLayer.name + " editable");
    }
}