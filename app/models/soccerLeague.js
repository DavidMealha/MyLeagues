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

module.exports = mongoose.model('SoccerLeagues', SoccerLeagueSchema);