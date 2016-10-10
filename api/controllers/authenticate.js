var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

	//Allows user input that's not case sensitive
	var username = req.body.username.toLowerCase();


	
	//checks to see if username is already taken
	//if not the user is registered and JWT token is sent
	User.findOne({name: username}, function(err, user){
		if(err){
			return res.status(500);
		}
		
		if(user){
			res.status(200).json({
				"user": "User already exists"
			});
		}
		else{
			  var user = new User();
			  
			  user.name = username;
			
			  user.setPassword(req.body.password);
			
			  user.save(function(err) {
			    var token;
			    token = user.generateJwt();
			    res.status(200);
			    res.json({
			      "token" : token
			    });
			  });			
		}
	});	
};

module.exports.login = function(req, res) {

	  passport.authenticate('local', function(err, user, info){
	    var token;
	
	    // If Passport throws/catches an error
	    if (err) {
	      res.status(404).json(err);
	      return;
	    }
	
	    // If a user is found
	    if(user){
	      token = user.generateJwt();
	      res.status(200);
	      res.json({
	        "token" : token
	      });
	    } else {
	      // If user is not found
	      res.status(401).json(info);
	    }
	  })(req, res);

};

module.exports.searchUser = function(req, res){
	//Allows user input that's not case sensitive
	var username = req.params.username.toLowerCase();	
	
	User.findOne({name: username}, function(err, user){
		if(err){
			return res.status(500);
		}

		if(user){
			res.status(200).json({
				"user": user.name
			});
		}
		else{
			res.status(200).json({
				"noUser": "User Doesn't Exist"
			})		
		}
	});	
		
};