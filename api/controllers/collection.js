var mongoose = require('mongoose');
var collect = mongoose.model('Collection');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.collectionAdd = function(req, res){
	
	collect.findOne({username: req.params.username, artist: req.body.artist, album: req.body.album}, function(err, collectItem){
		if(err){
			return res.status(500);
		}
		
		if(collectItem){
			res.status(200).json({
				"notAdded": "true"
			});	
		}
		else{
			collect.create({
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

module.exports.collectionRemove = function(req, res){
	
	collect.findOneAndRemove({username: req.params.username, artist: req.params.artist, album: req.params.album}, function(err, item, result){
		if(err){
			return res.status(500);
		}
		
		//send back ok status
		res.status(200).json(item);
	});
};

module.exports.collectionRender = function(req, res){
	collect.find({username: req.params.username}).lean().exec(function(err, items){
		if(err){
			return res.status(500);
		}
		
		//send back ok status and collection items
		res.status(200).json({items});

	});
};