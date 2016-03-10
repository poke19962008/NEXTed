/**
** Model Formation of Student & StudentDetail: model.js
** Author: SAYAN DAS
**/

var mongoose = require('mongoose');

var mongoConfig = require('../../../config').mongo.uri;
mongoose.connect(mongoConfig);

var studentSchema = require('../schema/student').student;
var studentDetailSchema = require('../schema/student').studentDetail;

studentSchema = require('./methods').studentMethod(studentSchema);
studentDetailSchema = require('./methods').studentDetailMethod(studentDetailSchema);

var student = mongoose.model('student', studentSchema);
var studentDetail = mongoose.model('studentDetail', studentDetailSchema);

exports.student = student;
exports.studentDetail = studentDetail;
