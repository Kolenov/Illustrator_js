var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var PrePress_allert = "PrePress?";
//var Design_allert = "Design?";

if (documents.length > 0)
{
doc.rulerOrigin = [0, 0];
   
Check = confirm(PrePress_allert);
if(Check == true)
	{
   PrePress = new File("c://forma.ai");
   importedGroup = doc.activeLayer.groupItems.createFromFile(PrePress);
   importedGroup.position = Array(docWidth/2 - 96*mm, 60*mm);
	}   
else 
{   
   Design = new File("c://forma_design.ai");
   importedGroup = doc.activeLayer.groupItems.createFromFile(Design);
   importedGroup.position = Array(docWidth/2 - 96*mm, 60*mm);
   }

}