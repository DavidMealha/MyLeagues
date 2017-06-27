var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname, '\\scripts'));
app.use(express.static(__dirname, '\\plugins'));
app.use(express.static(__dirname, '\\styles'));


var port = process.env.PORT || 8080;
app.listen(port);

//connect to database
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/soccerDB');
mongoose.connect('mongodb://User:user@ds139122.mlab.com:39122/myleaguestransferseu');
console.log("connect to mlab");
var SoccerLeague = require("./app/models/soccerLeague");

//routing
var router = express.Router();

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/',function(req,res){
	fs.readFile('index.html', function (err, html) {
         res.writeHeader(200, {"Content-Type": 'text/html'});
         res.write(html);
         res.end();
    });
});

router.route('/api/soccerLeagues')
	//GET /api/soccerLeagues
    .get(function(req, res) {
        SoccerLeague.find(function(err, leagues) {
            if (err)
                res.send(err);
            res.json(leagues);
        });
    })
    //POST /api/soccerLeagues
    .post(function(req, res){
    	var soccerLeague = new SoccerLeague();
    	soccerLeague.name = req.body.name;
    	soccerLeague.nrTreams = req.body.nrTreams;
    	soccerLeague.division = req.body.division;
    	soccerLeague.startDate = req.body.startDate;
    	soccerLeague.endDate = req.body.endDate;
    	soccerLeague.country.name = req.body.country;
    	soccerLeague.country.population = req.body.population;

    	soccerLeague.save(function(err){
    		if(err)
    			res.send(err);
    	})
    	res.json({ message: 'Soccer League created!'});
    });

router.route('/api/soccerLeagues/:league_id')
	//GET /api/soccerLeagues/:league_name
	.get(function(req, res) {
        SoccerLeague.findById(req.params.league_id, function(err, leagueDetail) {
            if (err)
                res.send(err);
            res.json(leagueDetail);
        });
    });

app.use('/', router);