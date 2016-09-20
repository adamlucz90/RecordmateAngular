var mongoose = require('mongoose');
var wish = mongoose.model('Wishlist');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.wishlistAdd = function(req, res){
	
	wish.findOne({username: req.body.username, artist: req.body.artist, album: req.body.album}, function(err, wishItem){
		if(err){
			console.log("error");
			res.status(401).json({
				"err": err
			});
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
					console.log(err);
					res.status(400);
				}
				res.status(200).json({
					"added": "true"
				});
			});
		}		
	});		
};

module.exports.wishlistRemove = function(req, res){
	
	wish.findOneAndRemove({username: req.body.username, artist: req.body.artist, album: req.body.album}, function(err, item, result){
		if(err){
			res.status(400);
		}
		
		res.status(200).json(item);
	});
};

module.exports.wishlistRender = function(req, res){

	wish.find({username: req.body.user}).lean().exec(function(err, items){
		if(err){
			res.status(400);
		}
		
		if(items){
			res.status(200).json({items});
		}
	});
};