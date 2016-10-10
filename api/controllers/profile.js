var mongoose = require('mongoose');
var friend = mongoose.model('profile');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

model.exports.bioUpdate = function(req, res){
	profile.findOne({username: req.params.username, bio: req.body.bio}, function(err, friendItem){
		if(err){
			return res.status(500);
		}
		
		if(wishItem){
			res.status(200).json({
				"notAdded": "true"
			});	
		}
		else{
			friend.create({
				username: req.params.username,
				friendname: req.body.friendname,
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
