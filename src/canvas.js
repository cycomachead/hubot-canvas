// Description
//   Manage your Canvas LMS course through Hubot!
//
// Configuration:
//   HUBOT_CANVAS_TOKEN
//   HUBOT_CANVAS_URL
//
// Commands:
//   hubot TODO
//
// Notes:
//   See README for token instructions.
//
// Author:
//   Michael Ball<cycomachead@gmail.com>

var newCanvas = require('../lib/canvas');

module.exports = function (robot) {
    var canvas = newCanvas(),
        courseID = process.env.HUBOT_COURSE_ID;

    if (!courseID) {
        console.log('HUBOT_COURSE_ID not set.');
        return;
    }
    
    course = canvas.Course(courseID);
    
    robot.respond(/show assignment (.*)/i, function (resp) {
        var assnName = resp.match[1]
        course.getFuzzy(assnName, 'assignments', function (err, resp1, body) {
            var name, id;
            if (body.length > 0) {
                name = body[0].name;
                id = body[0].id;
                resp.send(`Found assignment ${name}.`);
                resp.send('Gathering stats, one moment.');
                course.get(`assignments/${id}/`, {
                    'include[]': ['submissions', 'overrides'],
                    'override_assignment_dates': false,
                    'all_dates': true,
                })
            }
        })
    });
};
