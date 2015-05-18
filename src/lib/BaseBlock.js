/**
 * Basic Block
 * @constructor
 * @param {Lay} lay
 * @param {Element=} opt_element
 */
var BaseBlock = function (lay, opt_element) {
    /**
     * @type {number}
     */
    this.uid = util.getUid();
    if (opt_element) {
        opt_element.setAttribute('layid', this.uid);
    }

    /**
     * @type {Lay}
     */
    this.lay = lay;

    /**
     * @type {Object}
     */
    this.rect = {};

    this.calcRect(opt_element);
};

/**
 * calculate rect.
 * @param {opt_element}
 */
BaseBlock.prototype.calcRect = function (opt_element) {};

/**
 * Get calculate string to calc.
 * Using by `Eval`.
 */
BaseBlock.prototype.calc = function () {
    return 'var ' + this.uid + '={'
        +   'top:' + this.rect['top'] + ','
        +   'left:' + this.rect['left'] + ','
        +   'width:' + this.rect['width'] + ','
        +   'height:' + this.rect['height']
        + '};';
};

/**
 * Get element.
 * @param {Element}
 */
BaseBlock.prototype.getElement = function () {
    return this.lay.doc.querySelector('[layid="' + this.uid + '"]');
};

/**
 * Lay it, setup position, width and height.
 *
 * @param {Object=} opt_rect
 */
BaseBlock.prototype.layit = function (opt_rect) {
    if (opt_rect) {
        this.rect = opt_rect;
    }

    var el = this.getElement();
    if (!el) {
        return;
    }
    var style = el.style;
    for (var key in this.rect) {
        style[key] = this.rect[key] + 'px';
    }
};

/**
 * release block
 */
BaseBlock.prototype.release = function () {
    this.lay = null;
};


