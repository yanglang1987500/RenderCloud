var express = require('express');
var router = express.Router();
var userDao = require('../daos/userDao');
var fs = require('fs');

var  drawText = require('node-canvas-text');
var opentype = require('opentype.js');
var  Canvas = require('canvas');





/* GET home page. */
router.get('/fontimage', function (req, res, next) {
    var text = req.query.text;
    var canvas = new Canvas(500, 500);
    var ctx = canvas.getContext('2d');

    var titleFont = opentype.loadSync(__dirname + "/../DFPHaiBaoW12-GB.ttf");

    var headerRect = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height / 3.5 };


// Draw
    var drawRect = false;

    drawText(ctx, text, titleFont, headerRect,
        {
            minSize: 5,
            maxSize: 100,
            vAlign: 'bottom',
            hAlign: 'left',
            fitMethod: 'box',
            drawRect: drawRect} );
    var data = canvas.createSyncPNGStream();

    data.pipe(res);
});

module.exports = router;
