var mongoose = require('mongoose');

var mongoConfig = require('../../../config').mongo.uri;
mongoose.connect(mongoConfig);

var teacherSchema = require('../schema/teacher').teacher;
var teacherDetailSchema = require('../schema/teacher').teacherDetail;

teacherSchema = require('./methods').teacherMethods(teacherSchema);
teacherDetailSchema = require('./methods').teacherDetailMethods(teacherDetailSchema);

var teacher = mongoose.model('teacher', teacherSchema);
var teacherDetail = mongoose.model('teacherDetail', teacherDetailSchema);

exports.teacher = teacher;
exports.teacherDetail = teacherDetail;
