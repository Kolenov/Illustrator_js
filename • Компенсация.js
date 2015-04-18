var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var mm = 2.834645;
var mySelection = doc.selection;
var pgItems = doc.pageItems;
var _scale = 0;
var _center = 0;
var MinusRatio = 0;
var PlusRatio = 0;

//  ������������� ����   //
doc.rulerOrigin = [0, 0];
//-------------------������� ������-------------------//
var step = Math.floor(docWidth / mm);
switch (step) {
case 422:
	MinusRatio = 97.655556213368065833876028654313;
	PlusRatio = 102.40072749317975143983025159139;
	break;

case 368:
	 MinusRatio = 97.311973934292696171599239750204;
	 PlusRatio = 102.76227678571428571428571428571;
	break;

case 330:
	 MinusRatio = 97.001817080557238037552998182919;
	 PlusRatio = 103.09085232594442709959413050265;
	break;

case 279:
	 MinusRatio = 96.456692913385826771653543307087;
	 PlusRatio = 103.67346938775510204081632653061;
	break;

case 238:
	 MinusRatio = 95.842519685039370078740157480315;
	 PlusRatio = 104.33782451528097272428524482419;
	break;

case 209:
	 MinusRatio = 95.275590551181102362204724409449;
	 PlusRatio = 104.95867768595041322314049586777;
	break;
}

var NormalWidth = docWidth;
var CompensWidth = docWidth * MinusRatio / 100; //������ ����� �����������
//var X_shift = docWidth/2 - CompensWidth/2; //�������� ��� ����������������� �� ������ ��������
var X_shift = 9.9*mm/2;
// ���� �������� ������ (������ ���� ����� ������ ���������)
for (i = pgItems.length - 1; i >= 0; i--) { //�������� � ������ ������� �������
if ((Math.floor(pgItems[i].width) == Math.floor(NormalWidth))&& (pgItems[i].selected)) {alert ("scaling- and centering (to right)"); _scale = 1; _center = 1; break;}
if ((Math.floor(pgItems[i].width) == Math.floor(CompensWidth))&& (pgItems[i].selected)) {alert ("scaling+ and centering (to left)"); _scale = 2; _center = 2; break;}
if ((Math.floor(pgItems[i].width) == Math.floor(CompensWidth)) && (!pgItems[i].selected)) {alert ("scaling- only"); _scale = 1; _center = 0; break;}
}



	function Transform (obj){
		if (_scale==0){obj.resize(100.0, 100.0, true, true, true, true, 100.0, Transformation.DOCUMENTORIGIN);}
		if (_scale==1){obj.resize(MinusRatio, 100.0, true, true, true, true, 100.0, Transformation.DOCUMENTORIGIN);}
		if (_scale==2){obj.resize(PlusRatio, 100.0, true, true, true, true, 100.0, Transformation.DOCUMENTORIGIN);}
	}
	
	function Center(obj){//������������� ��� �� ������ ��������
		var _x = obj.position[0];
		var _y = obj.position[1];
		if (_center==0){obj.position =  Array(_x, _y);}
		if (_center==1){obj.position =  Array(_x + X_shift, _y);}
		if (_center==2){obj.position =  Array(_x - X_shift, _y);}
 	}
 	
 	
 	for (i = 0; i < mySelection.length; i++) {
 		if (_scale==1) {Transform (mySelection[i]); Center (mySelection[i]);}
 		if (_scale==2) {Center (mySelection[i]); Transform (mySelection[i]);}	
	}
 	
 	
 	
/* 	
//���� �������� ������
for (i = mySelection.length - 1; i >= 0; i--) {
	if (Math.floor(mySelection[i].width) == Math.floor(docWidth)) {    
		_go = 1;
	} 	
	
	if (_go == 1) {
		mySelection[i].resize(MinusRatio, 100, true, true, true, true, 100, Transformation.DOCUMENTORIGIN);
	}
	var _x = mySelection[i].position[0];
	var _y = mySelection[i].position[1];
	var centerPointX = _x + mySelection[i].width / 2;
	var centerPointY = _y - mySelection[i].height / 2;
	//��������� ������� ����������� (�������� ������ �����, ������ �������� ����� ������ ��������-9,9)
	if (Math.floor(mySelection[i].width) == Math.floor(CompensWidth)) {
		//���������� ���������� ������ ��������� ������������������ �������
		var centerPointKeyX = mySelection[i].position[0] + mySelection[i].width / 2;
		//�������� ��������� ������� ������������ ������ (��������� ��� ���� ���������� ��������)
		var _shift = docWidth / 2 - centerPointKeyX;
	}
	//���������� ��������� �� ������ ���������� ������� � ���� �������� 
	//	if ((centerPointX > 0) && (centerPointX < docWidth) && (centerPointY > 0) && (centerPointY < docHeight)) {
	//		//������������� ��� �� ������ ��������
	//		mySelection[i].position = Array(_x + _shift, _y);
	//	}
}

if ((centerPointX > 0) && (centerPointX < docWidth) && (centerPointY > 0) && (centerPointY < docHeight)) {
	//������������� ��� �� ������ ��������
	mySelection.position = Array(_x + _shift, _y);
}
*/