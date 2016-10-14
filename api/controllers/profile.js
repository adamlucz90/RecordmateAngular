var mongoose = require('mongoose');
var bio = mongoose.model('Bio');
var band = mongoose.model('Bands');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.bioUpdate = function(req, res){
	bio.findOneAndUpdate({username: req.params.username}, {bio: req.body.bio}, function(err, bioItem){
		if(err){
			return res.status(500);
		}
		
		if(bioItem){
			res.status(200).json({
				"updated": "true"
			});	
		}
		else{
			bio.create({
				username: req.params.username,
				bio: req.body.bio
			}, function(err, item){
				if(err){
					res.status(500);
				}
				res.status(200).json({
					"updated": "true"
				});
			});
		}		
	});	
};

module.exports.bioRender = function(req, res){
	bio.find({username: req.params.username}).lean().exec(function(err, item){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and the wishlist items
		res.status(200).json({item});
		
	});	
};

module.exports.bandUpdate = function(req, res){
	band.findOneAndUpdate({username: req.params.username}, {bands: req.body.bands}, function(err, bandItem){
		if(err){
			return res.status(500);
		}

		if(bandItem){
			res.status(200).json({
				"updated": "true"
			});	
		}
		else{
			band.create({
				username: req.params.username,
				bands: req.body.bands
			}, function(err, item){
				if(err){
					res.status(500);
				}
				res.status(200).json({
					"updated": "true"
				});
			});
		}		
	});	
};

module.exports.bandRender = function(req, res){
	band.find({username: req.params.username}).lean().exec(function(err, item){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and the wishlist items
		res.status(200).json({item});
		
	});	
};

