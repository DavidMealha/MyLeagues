var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SoccerLeagueSchema = new Schema({
    name: String,
    nrTeams: Number,
    division: Number,
    startDate: Date,
    endDate: Date,
    country: {
    	name: String,
    	population: Number
    }
});

SoccerLeagueSchema.statics.findByName = function(qname, cb){
	return this.find({ name: qname }, cb);
}

SoccerLeagueSchema.statics.findByIdentifier = function(id, cb){
    console.log("this is the id: " + id);
    return this.find({ _id: id }, cb);   
}

module.exports = mongoose.model('SoccerLeagues', SoccerLeagueSchema);