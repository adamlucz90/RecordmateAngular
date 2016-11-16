var mongoose = require('mongoose');
var comment = mongoose.model('Comments');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.commentAdd = function(req, res){
	console.log("req");
	//create and save new comment into database
	comment.create({
		username : req.params.username,
		email : req.body.email,
		artist : req.params.artist,
		album : req.params.album,
		comment : req.body.comment,
	}, function(err, item){
		if(err){
			res.status(500);
		}
		else{
			res.status(200).json({
				"added": "true"
			});
		}
	});
};

module.exports.commentRender = function(req, res){
	console.log(req);
	comment.find({artist: req.params.artist, album: req.params.album}).sort({date: 1}).lean().exec(function(err, comments){
		if(err){
			res.status(500);
		}
		
		res.status(200).json({
			"comments": comments
		});
	});
}
