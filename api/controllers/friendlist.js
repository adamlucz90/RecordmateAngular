var mongoose = require('mongoose');
var friend = mongoose.model('Friendlist');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.friendlistAdd = function(req, res){
	
	friend.findOne({username: req.body.username, friendname: req.body.friendname}, function(err, friendItem){
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
				username: req.body.username,
				friendname: req.body.friend,
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

module.exports.friendlistRemove = function(req, res){
	
	friend.findOneAndRemove({username: req.body.username, friendname: req.body.friendname}, function(err, item, result){
		if(err){
			return res.status(500);
		}
		
		//send back ok status
		res.status(200).json(item);
	});
};

module.exports.friendlistRender = function(req, res){

	friend.find({username: req.body.user}).lean().exec(function(err, items){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and the wishlist items
		res.status(200).json({items});
		
	});
};