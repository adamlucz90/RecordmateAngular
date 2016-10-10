var mongoose = require('mongoose');
var profile = mongoose.model('Profile');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.bioUpdate = function(req, res){
	profile.findOne({username: req.params.username, bio: req.body.bio}, function(err, profileItem){
		if(err){
			return res.status(500);
		}
		
		if(profileItem){
			res.status(200).json({
				"notAdded": "true"
			});	
		}
		else{
			profile.create({
				username: req.params.username,
				bio: req.body.friendname,
				genres: ""
			}, function(err, item){
				if(err){
					res.status(500);
				}
				res.status(200).json({
					"added": "true"
				});
			});
		}		
	});	
};

module.exports.bioRender = function(req, res){
	profile.find({username: req.params.username}).lean().exec(function(err, item){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and the wishlist items
		res.status(200).json({item});
		
	});	
};


