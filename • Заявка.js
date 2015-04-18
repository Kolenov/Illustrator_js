var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var MSG_nosel = "No selected bject!";
var AIversion = version.slice(0,2);

if (AIversion == "10") {var TextRef = doc.textArtItems;}
else {var TextRef = doc.textFrames;}

if (selection.length == 1) {
if (AIversion == "10") {var MyContents = doc.selection[0].textRange().contents;}
else {var MyContents = doc.selection[0].contents;}
//разбиваем на блоки строчку    Заказчик | <Наименование работы> | Untitled-3 | (13.07.2006 - 15:10) | 307.100 x 230.000
BlokList = MyContents.split(/\s*\|\s*/g);
// разбиваем на блоки строчку 307.100 x 230.000
if (BlokList.length>4) {Width_Hight = BlokList[4].split(/\s\x\s/);}

TextRefcounter = TextRef.length;
 for (i = TextRefcounter-1; i >= 0; i--)
  {
     if (TextRef[i].editable)
     {
     
      if (AIversion == "10") {var obj = TextRef[i].textRange();}
      else {var obj = TextRef[i];}
          
      if (obj.contents == "{CLIENT}{NAME}") {obj.contents=BlokList[0]+" "+BlokList[1];}
      else if (obj.contents == "{CLIENT}") {obj.contents=BlokList[0];}
      else if (obj.contents == "{NAME}") {obj.contents=BlokList[1];}
      else if (obj.contents == "{FILE}") {obj.contents=BlokList[2];}
      else if (obj.contents == "{DATE}") 
      {
         if (BlokList.length>4) {obj.contents=BlokList[3];}
         else {obj.contents=TodayDate()}
      }
      else if (obj.contents == "{WIDTH}") {obj.contents=Width_Hight[0];}
      else if (obj.contents == "{HEIGHT}") {obj.contents=Width_Hight[1];}
      else {}
    }
 }
 doc.selection[0].remove();
}
else {alert(MSG_nosel);}

function TodayDate(){
	var Today = new Date();
	var Day = Today.getDate();
	var Month = Today.getMonth() + 1;
	var Year = Today.getYear();
	var PreMon = ((Month < 10) ? "0" : "");
	var PreDay = ((Day < 10) ? "0" : "");
	if(Year < 999) Year += 1900;
	return PreDay+Day+"."+PreMon+Month+"."+Year;  // customize your date here
}