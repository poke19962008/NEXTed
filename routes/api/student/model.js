/**
** Model Formation of Student & StudentDetail: model.js
** ( Schema -> Methods) -> Model
** Author: SAYAN DAS
**/

var mongoose = require('../../../server').mongoose;


var studentSchema = require('../schema/student').student;
var studentDetailSchema = require('../schema/student').studentDetail;

studentSchema = require('./methods').studentMethod(studentSchema);
studentDetailSchema = require('./methods').studentDetailMethod(studentDetailSchema);

var student = mongoose.model('student', studentSchema);
var studentDetail = mongoose.model('studentDetail', studentDetailSchema);

exports.student = student;
exports.studentDetail = studentDetail;
