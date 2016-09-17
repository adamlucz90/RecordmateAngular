var mongoose = require('mongoose');
var wish = mongoose.model('Wishlist');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.wishlistAdd = function(req, res){
	var wishlist = new wish();
	var add;
	
	wishlist.findOne({ 'username' : req.body.username }, function(err, item){
		if(err){
			res.status(404).json(err);
			return;
		}
		
		if(item){
			res.json({
				"yay": "success"
			});
		}
		
	});
	
	// wishlist.username = req.body.username;
	// wishlist.artist = req.body.artist;
	// wishlist.album = req.body.album;
	// wishlist.url = req.body.url;
// 
	// //check to see if item is already in user's wishlist
	// wishlist.findOne({ 'artist': req.body.artist }, function(err, item){
		// if(err){
			// res.status(404).json(err);
			// return;
		// }
		// res.json(item);
		// if(!item){
			// add = true;
		// }
		// else{
			// res.status(401).jason({
				// "item": "exists"
			// });		
		// }
	// });	
// 	
	// if(add){
		// wishlist.save(function(err){
			// res.status(200);
			// res.json({
				// "item" : "added"
				// });
		// });	
	// }		
};

	
	

