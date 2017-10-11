var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SoccerLeagueSchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    nrTeams: Number,
    division: Number,
    startDate: Date,
    endDate: Date,
    image: String,
    country: {
    	name: String,
    	population: Number,
   	code: String
    }
});

SoccerLeagueSchema.statics.findAll = function(cb){
    return this.find({}, cb);
}

SoccerLeagueSchema.statics.findByName = function(qname, cb){
	return this.find({ name: qname }, cb);
}

SoccerLeagueSchema.statics.findByIdentifier = function(id, cb){
    console.log("this is the id: " + id);
    return this.find({ _id: id }, cb);   
}

module.exports = mongoose.model('soccerleagues', SoccerLeagueSchema);
