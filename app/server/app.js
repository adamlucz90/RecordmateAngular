var express = require("express");
var app = express();

var mongoUtil = require('./mongoUtil.js');
mongoUtil.connect();

app.use(express.static(__dirname + "/.."));

var bodyParser = require("body-parser");


app.get("/reg/:username/:pass", function(req, res){
	var users = mongoUtil.users();
	var username = req.params.username;
	var pass = req.params.pass;
	var userExists = false;
	
	users.find({"name": username}).toArray(function(err, docs){
		if(err){
			res.status(400);
		}
		else{
			if(docs[0]){
				console.log("IT WORKS");
				userExists = true;
			}
		}
	}).then(function(){
	
		console.log(userExists);
		if(userExists){
			res.status(201).json("exists");
		}
		else{
			users.insert({"name": username, "pass": pass}, function(err, records){
				res.status(201).json("inserted");
			});

		}
	});
});

app.listen(8000, function(){console.log("Listening on 8000")});
