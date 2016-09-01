var mongo = require('mongodb');
var client = mongo.MongoClient;
var _db;

module.exports = {
	connect: function(){
		client.connect('mongodb://localhost:27017/recordmate', function (err, db){
			if (err){
				console.log("Error connecting to Mongo - check monogod connection");
				process.exit(1);
			}
			_db = db;
			console.log("Connected to Mongo");
		});
	},
	users: function(){
		return _db.collection('users');
	}
			
}
