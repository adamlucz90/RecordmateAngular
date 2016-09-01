var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/recordmate');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log("connected to mongoose");
			
	var userSchema = mongoose.Schema({
		name: String,
		pass: String
	});
	
	var user = mongoose.model('user', userSchema);
	module.exports = {
		user: user,
	}
	
});
