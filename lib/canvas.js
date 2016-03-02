// Utility to create a Canvas course instance

var Canvas = require('canvas-lms');

/*
    A very simple implementation of Object::extend
*/
function objectExtend() {
    var result = {},
        objects = Array.prototype.slice.call(arguments, 0);
    
    objects.forEach(function (obj) {
        for (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}

/*
    TODO: How should advanced options be handled?
*/
function canvasFromEnv(options) {
    var URL, TOKEN;
    TOKEN = process.env.HUBOT_CANVAS_TOKEN;
    URL = process.env.HUBOT_CANVAS_URL;
    if (!URL) {
        console.error('HUBOT_CANVAS_URL is not set.');
        return;
    }
    if (!TOKEN) {
        console.error('HUBOT_CANVAS_TOKEN is not set.');
    }
    return new Canvas(objectExtend(
        {
            host: URL,
            token: TOKEN,
        }, (options || {})
    ));
}

function canvasFromRobot(robot) {
    return;
}

function newCanvas(robot, options) {
    if (robot && robot.constructor.name === 'Robot') {
        return canvasFromRobot(robot, options);
    }
    return canvasFromEnv(robot);
}

module.exports = newCanvas;
