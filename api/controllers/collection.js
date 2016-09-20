var mongoose = require('mongoose');
var collect = mongoose.model('Collection');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.collectionAdd = function(req, res){
	
	collect.findOne({username: req.body.username, artist: req.body.artist, album: req.body.album}, function(err, collectItem){
		if(err){
			console.log("error");
			res.status(401).json({
				"err": err
			});
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

module.exports.collectionRemove = function(req, res){
	
	collect.findOneAndRemove({username: req.body.username, artist: req.body.artist, album: req.body.album}, function(err, item, result){
		if(err){
			res.status(400);
		}
		
		res.status(200).json(item);
	});
};

module.exports.collectionRender = function(req, res){

	collect.find({username: req.body.user}).lean().exec(function(err, items){
		if(err){
			res.status(400);
		}
		
		if(items){
			res.status(200).json({items});
		}
	});
};