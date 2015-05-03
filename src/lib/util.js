var util = {};
var uid = 0;

/**
 * Get uid
 */
util.getUid = function () {
    return 'b' + (++uid);
};

/**
 * util.inherits(Son, Father);
 *
 * @param {Function} subClass
 * @param {Function} superClass
 */
util.inherits = function (subClass, superClass) {
    var key;
    var proto;
    var selfProps = subClass.prototype;
    var clazz = new Function();

    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();
    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;
};

/**
 * Get view width
 * @param {Document} doc
 * @return {number}
 */
util.getViewWidth = function (doc) {
    doc = doc || document;
    var client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};


/**
 * Get view height
 * @param {Document} doc
 * @return {number}
 */
util.getViewHeight = function (doc) {
    doc = doc || document;
    var client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientHeight;
};


/**
 * Get view top
 * @param {Document} doc
 * @return {number}
 */
util.getViewTop = function (doc) {
    doc = doc || document;
    var win = doc.defaultView;
    return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
};


/**
 * Get view left
 * @param {Document} doc
 * @return {number}
 */
util.getViewLeft = function (doc) {
    doc = doc || document;
    var win = doc.defaultView;
    return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
};

/**
 * Get page height
 * @param {Document} doc
 * @return {number}
 */
util.getPageHeight = function (doc) {
    doc = doc ||  document;
    var body = doc.body;
    var html = doc.documentElement;
    var client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};

/**
 * Get page width
 * @param {Document} doc
 * @return {number}
 */
util.getPageWidth = function (doc) {
    doc = doc || document;
    var body = doc.body;
    var html = doc.documentElement;
    var client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};

/**
 * Get rect
 * @param {Element}
 * @return {Object}
 */
util.getRect = function (element) {
    var doc = element.ownerDocument;
    var clientRect = element.getBoundingClientRect();
    var rect = {};
    rect['width'] = clientRect['width'];
    rect['height'] = clientRect['height'];
    rect['top'] = clientRect['top'] + util.getViewTop(doc);
    rect['left'] = clientRect['left'] + util.getViewLeft(doc);

    return rect;
};


module.exports = util;

