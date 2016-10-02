'use strict';
var mm = 2.834645;
var doc = activeDocument;
var docHeight = doc.height;
var docWidth = doc.width;
var selectedItems = doc.selection;
var pgItems = doc.pageItems;
var minusRatio = null;
var plusRatio = null;

doc.rulerOrigin = [0, 0];

var TRANSFORM_OPTION = {
    plus: 1,
    minus: 1 << 1,
    toLeft: 1 << 2,
    toRight: 1 << 3
};

var transformFlags = null;

var step = Math.floor(docWidth / mm);
switch (step) {
    case 422:
        minusRatio = 97.655556213368065833876028654313;
        plusRatio = 102.40072749317975143983025159139;
        break;

    case 368:
        minusRatio = 97.311973934292696171599239750204;
        plusRatio = 102.76227678571428571428571428571;
        break;

    case 330:
        minusRatio = 97.001817080557238037552998182919;
        plusRatio = 103.09085232594442709959413050265;
        break;

    case 279:
        minusRatio = 96.456692913385826771653543307087;
        plusRatio = 103.67346938775510204081632653061;
        break;

    case 238:
        minusRatio = 95.842519685039370078740157480315;
        plusRatio = 104.33782451528097272428524482419;
        break;

    case 209:
        minusRatio = 95.275590551181102362204724409449;
        plusRatio = 104.95867768595041322314049586777;
        break;

    default:
        minusRatio = 1.0;
        plusRatio = 1.0;
}

var normalWidth = Math.floor(docWidth / mm);
var compensatedWidth = Math.floor((docWidth * (minusRatio / 100)) / mm);
var xShift = (docWidth - docWidth * (minusRatio / 100)) / 2;

transformFlags = function () {
    var flags = null;
    var itemsCount = pgItems.length;
    for (var i = 0; i < itemsCount; ++i) {
        var currentItemWidth = Math.floor(pgItems[i].width / mm);

        if ((currentItemWidth == normalWidth) && (pgItems[i].selected)) {
            alert("Make job compensation");
            flags = TRANSFORM_OPTION.minus | TRANSFORM_OPTION.toRight;
            break;
        }
        if ((currentItemWidth == compensatedWidth) && (pgItems[i].selected)) {
            alert("Clear job compensation");
            flags = TRANSFORM_OPTION.plus | TRANSFORM_OPTION.toLeft;
            break;
        }
        if ((currentItemWidth == compensatedWidth) && (!pgItems[i].selected)) {
            alert("Make object compensation");
            flags = TRANSFORM_OPTION.minus | TRANSFORM_OPTION.toRight;
            break;
        }
    }
    return flags;
}();

for (var i = 0; i < selectedItems.length; i++) {
    if (transformFlags & TRANSFORM_OPTION.minus) {
        transform(selectedItems[i]);
        toCenter(selectedItems[i]);
    }
    // must to align before to transform to keep correct positioning
    if (transformFlags & TRANSFORM_OPTION.plus) {
        toCenter(selectedItems[i]);
        transform(selectedItems[i])
    }
}

/**
 *
 * @param {Object} obj
 */
function transform(obj) {
    if (transformFlags & TRANSFORM_OPTION.minus) {
        obj.resize(minusRatio, 100.0, true, true, true, true, 100.0, Transformation.DOCUMENTORIGIN);
    }
    if (transformFlags & TRANSFORM_OPTION.plus) {
        obj.resize(plusRatio, 100.0, true, true, true, true, 100.0, Transformation.DOCUMENTORIGIN);
    }
}

/**
 *
 * @param {Object} obj
 */
function toCenter(obj) {
    var x = obj.position[0];
    var y = obj.position[1];
    if (transformFlags & TRANSFORM_OPTION.toRight) {
        obj.position = [x + xShift, y];
    }
    if (transformFlags & TRANSFORM_OPTION.toLeft) {
        obj.position = [x - xShift, y];
    }
}