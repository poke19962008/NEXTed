/**
** Model Formation of Teacher & teacherDetail: model.js
** ( Schema -> Methods) -> Model
** Author: SAYAN DAS
**/

// Configured mongoose
var mongoose = require('../../../server').mongoose;

// Schema Imports
var teacherSchema = require('../schema/teacher').teacher;
var teacherDetailSchema = require('../schema/teacher').teacherDetail;

// Method linking with schema
teacherSchema = require('./methods').teacherMethod(teacherSchema);
teacherDetailSchema = require('./methods').teacherDetailMethod(teacherDetailSchema);

// Schema integration
var teacher = mongoose.model('teacher', teacherSchema);
var teacherDetail = mongoose.model('teacherDetail', teacherDetailSchema);

exports.teacher = teacher;
exports.teacherDetail = teacherDetail;
