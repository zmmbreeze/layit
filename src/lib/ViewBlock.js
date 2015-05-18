/**
 * View Block
 * @constructor
 * @param {Lay} lay
 */
var ViewBlock = function (lay) {
    BaseBlock.apply(this, arguments);
    this.uid = 'view';

    var win = this.lay.doc.defaultView;
    this._listener = this._onresize.bind(this);
    win.addEventListener('resize', this._listener, false);
};

util.inherits(ViewBlock, BaseBlock);

/**
 * onresize
 */
ViewBlock.prototype._onresize = function () {
    var that = this;
    if (that._resizeTimeout) {
        clearTimeout(that._resizeTimeout);
        that._resizeTimeout = 0;
    }

    that._resizeTimeout = setTimeout(function () {
        // TODO

        that._resizeTimeout = 0;
    }, 250);
};

/** @override */
ViewBlock.prototype.calcRect = function () {
    var doc = this.lay.doc;
    this.rect['width'] = util.getViewWidth(doc);
    this.rect['height'] = util.getViewHeight(doc);
    this.rect['top'] = util.getViewTop(doc);
    this.rect['left'] = util.getViewLeft(doc);
};

/** @override */
ViewBlock.prototype.getElement = function () {
    return;
};

/** @override */
ViewBlock.prototype.release = function () {
    var win = this.lay.doc.defaultView;
    win.removeEventListener('resize', this._listener, false);

    ViewBlock.superClass.release.apply(this, arguments);
};


