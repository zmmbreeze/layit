var util = require('./lib/util');
var LayBlock = require('./lib/LayBlock');
var AutoBlock = require('./lib/AutoBlock');
var ViewBlock = require('./lib/ViewBlock');

/**
 * Layit
 * @param {Document} doc
 */
var Lay = function (doc) {
    /**
     * @type {Document}
     */
    this.doc = doc;

    /**
     * @type {number}
     */
    this._resizeTimeout = 0;

    /**
     * @type {Array}
     */
    this.blocks = [];

    /**
     * @type {Object}
     */
    this.blockMap = {};

    /**
     * @type {ViewBlock}
     */
    this.viewBlock = new ViewBlock(this);
    this.addBlock(viewBlock);

    this._setup();
};

/**
 * setup basic info
 */
Lay.prototype._setup = function () {
    var win = this.doc.defaultView;
    this._detectBlocks();
};

/**
 * release
 */
Lay.prototype.release = function () {
    var blocks = this.blocks;
    this.blocks = null;
    this.blockMap = null;
    for (var i = 0, l = blocks.length; i < l; i++) {
        blocks[i].release();
    }
};

/**
 * Add block
 * @param {Block} block
 */
Lay.prototype.addBlock = function (block) {
    this.blocks.push(block);
    this.blockMap[block.uid] = block;
};

/**
 * Remove block
 * @param {string} uid
 */
Lay.prototype.removeBlock = function (uid) {
    if (!this.blockMap || !this.blocks) {
        return;
    }

    this.blockMap[uid] = null;
    var block;
    for (var i = 0, l = this.blocks.length; i < l; i++) {
        block = this.blocks[i];
        if (block.uid === uid) {
            this.blocks.splice(i, 1);
        }
    }
};

Lay.prototype._detectBlocks = function () {
    var blockElements = this.doc.querySelectorAll('[lay]');
    for (var i = 0, l = blockElements.length; i < l; i++) {
        this.addBlock(new LayBlock(this, blockElements[i]));
    }
};

/**
 * Get block by token or uid
 *
 * @param {string} token
 */
Lay.prototype.getBlock = function (token) {
    var block = this.blockMap[token];
    if (!block) {
        var el = this.doc.querySelector(token);
        if (el) {
            var layid = el.getAttribute('layid');
            if (layid) {
                block = this.blockMap[layid];
            }
            else {
                block = new AutoBlock(this, el);
            }
        }
    }

    if (!block) {
        throw new Error('Token: "' + token + '" not found.');
    }
    return block;
};


