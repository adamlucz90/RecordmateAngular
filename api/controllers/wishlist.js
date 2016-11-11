var mongoose = require('mongoose');
var wish = mongoose.model('Wishlist');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.wishlistAdd = function(req, res){
	
	wish.findOne({username: req.params.username, artist: req.body.artist, album: req.body.album}, function(err, wishItem){
		if(err){
			return res.status(500);
		}
		
		if(wishItem){
			res.status(200).json({
				"notAdded": "true"
			});	
		}
		else{
			wish.create({
				username: req.body.username,
				artist: req.body.artist,
				album: req.body.album,
				url: req.body.url
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

module.exports.wishlistRemove = function(req, res){
	
	wish.findOneAndRemove({username: req.params.username, artist: req.params.artist, album: req.params.album}, function(err, item, result){
		if(err){
			return res.status(500);
		}
		
		//send back ok status
		res.status(200).json(item);
	});
};

module.exports.wishlistRender = function(req, res){

	wish.find({username: req.params.username}).lean().exec(function(err, items){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and the wishlist items
		res.status(200).json({items: items});
		
	});
};