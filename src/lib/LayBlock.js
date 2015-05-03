var BaseBlock = require('./BaseBlock');
var util = require('./util');
var ruleReg = /([^:]+):([^;$]+);?/g;
var tokenReg = /([a-zA-Z][a-zA-Z0-9\-]*)\./g;

/**
 * LayBlock element
 * @constructor
 * @param {Element} element
 * @param {Lay} lay
 */
var LayBlock = function (element, lay) {
    /**
     * @type {number}
     */
    this.uid = util.getUid();
    element.setAttribute('layid', this.uid);

    /**
     * @type {Lay}
     */
    this.lay = lay;

    /**
     * @type {Object}
     */
    this.rectInfo = null;
    this._parseRect();

    /**
     * @type {Object}
     */
    this.rect = {};
};

/**
 * Parse lay attribute into a rect, like:
 *
 *  {
 *      'top': 10,
 *      'left': 10,
 *      'width': 100,
 *      'height': {
 *          'v': 'view.height',     // value
 *          't': 'view'             // required token
 *      }
 *  }
 *
 * @param {string} layStr
 */
Block.prototype._parseRect = function (layStr) {
    layStr = layStr.trim();
    if (!layStr) {
        return;
    }

    var rectInfo = {};
    var r;
    var key;
    var value;
    var number;
    var token;
    while (r = ruleReg.exec(layStr)) {
        key = r[1];
        value = r[2];
        while (r = value.match(tokenReg)) {
            token = token || [];
            token.push(r[1]);
        }

        if (token) {
            rectInfo[key] = {
                'v': value,
                't': token
            };
            token = null;
        }
        else {
            number = parseInt(value, 10);
            if (!number) {
                throw new Error('Value: "' + value + '" is not a valid number or token.');
            }
            rectInfo[key] = number;
        }
    }

    if (!key) {
        throw new Error('Lay attr: "' + layStr + '" is not valid.');
    }

    this.rectInfo = rectInfo;
};

Block.prototype.calc = function () {
    var rect = this.rect;
    var calcStr = '';
    var value;
    for (var key in this.rectInfo) {
        value = this.rectInfo[key];
        if (value['v']) {
            calcStr += this.getRequiredCalc(value);
            value[key] = value['v'];
        }
        else {
            rect[key] = value;
        }
    }
    calcStr += 'var ' + this.uid + '={'
        +   'top:' + rect['top'] + ','
        +   'left:' + rect['left'] + ','
        +   'width:' + rect['width'] + ','
        +   'height:' + rect['height']
        + '}';
    return calcStr;
};

/**
 * @param {Object} value
 * @param {string} value.v  value
 * @param {string} value.t  token
 */
LayBlock.prototype.getRequiredCalc = function (value) {
    var block = this.lay.getBlock(value.t);
    var calc = block.calc();
    return calc;
};

module.exports = LayBlock;

