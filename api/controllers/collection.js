var mongoose = require('mongoose');
var collection = mongoose.model('collection');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.wishlistAdd = function(req, res){
	var wishlist = new collection();
	
	wishlist.username = req.body.username;
	wishlist.artist = req.body.artist;
	wishlist.album = req.body.album;
	wishlist.url = req.body.url;
	wishlist.type = "wishlist";
	
	wishlist.save(function(err){
		res.status(200);
		res.json({
			"add" : "success"
		});
	});
};

// module.exports.getWishlist = function(req, res){
	// collection.
	
	

