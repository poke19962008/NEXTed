/**
** All the methods for Competition models
** Author: SAYAN DAS
**/

exports.competitionMethod = function(competitionSchema){

  /**
  ** Get Competition with the Matching Skill Sets
  **/
  competitionSchema.methods.getCompetition = function(skills, cb){
    this.model('competition').find({
      reqSkills: {
        $in: skills
      }
    },"name description schoolName regDate venue", cb);
  }

  return competitionSchema;
};
