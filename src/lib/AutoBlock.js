var BaseBlock = require('./BaseBlock');
var util = require('./util');

/**
 * Auto size element's block.
 * @constructor
 * @param {Lay} lay
 * @param {Element} element
 */
var AutoBlock = function (lay, element) {
    BaseBlock.apply(this, arguments);
};

util.inherits(AutoBlock, BaseBlock);

/** @override */
AutoBlock.prototype.calcRect = function (element) {
    this.rect = util.getRect(element);
};

/** @override */
AutoBlock.prototype.layit = function () {};

module.exports = AutoBlock;

