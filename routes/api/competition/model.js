/**
** Model Formation of competition: model.js
** ( Schema -> Methods) -> Model
** Author: SAYAN DAS
**/

// Configured mongoose
var mongoose = require("../../../server").mongoose;

// Schema Imports
var competitionSchema = require("../schema/competition").competition;

// Method linking with schema
competitionSchema = require("./methods").competitionMethod(competitionSchema);

// Schema integration
var competition = mongoose.model('competition', competitionSchema);

exports.competition = competition;
