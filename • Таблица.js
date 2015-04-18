var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;

if (documents.length > 0) {
    doc.rulerOrigin = [0, 0];

    PrePress = new File("c://forma.ai");
    importedGroup = doc.activeLayer.groupItems.createFromFile(PrePress);
    importedGroup.position = [docWidth / 2 - 96 * mm, 60 * mm];
}