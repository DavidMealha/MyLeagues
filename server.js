var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require("path");
var Twitter = require('twitter');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname, '\\assets'));

var port = process.env.PORT || 8080;
app.listen(port);

var mongoose = require('mongoose');
//mongoose.connect('mongodb://192.168.56.136:27017/myleaguestransferseu');
mongoose.connect("mongodb://User:user@ds139122.mlab.com:39122/myleaguestransferseu");

var conn = mongoose.connection;
var SoccerLeague = require("./app/models/soccerLeague");

conn.once('open', function() {

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
	        console.log("Running server");
        });
    });

    router.route('/api/soccerLeagues')
        .get(function(req, res) {
            SoccerLeague.findAll(function(err, leagues) {
                if (err)
                    res.send(err);
                res.json(leagues);
            });
        })
        
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
        .get(function(req, res) {
            SoccerLeague.findById(req.params.league_id, function(err, leagueDetail) {
                if (err)
                    res.send(err);
                res.json(leagueDetail);
            });
        });

    router.route('/api/tweets/:query')
        .get(function(req, res) {
            var client = new Twitter({
                consumer_key: 'zw0js8oFmzOw9Rxe3vY9HojKh',
                consumer_secret: '6lPJ5co31aJ4x187is7zcsn8n1C8g7gQcUJuGOGJjLR5CX9alM',
                access_token_key: '879728003500126209-C1ztQycl3ChxPYcMyigJRlENsM6aNKc',
                access_token_secret: 'LdmCWIhFjCaDvw3vyu9XfL6y2oSDJM7s2DJEl0v7bJwqL'
            });

            var query = req.params.query + " filter:verified exclude:replies exclude:retweets"

            client.get('search/tweets', {q: query, result_type: 'recent popular mixed', count: 25}, function(error, tweets, response){
                res.json(tweets);
            });
        });

    app.use('/', router);
});
