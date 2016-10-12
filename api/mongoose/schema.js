var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	hash: String,
	salt: String	
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // NEEDS TO BE CHANGED
};

var wishlistSchema = new mongoose.Schema({
	username: String,
	artist: String,
	album: String,
	url: String
}, {collection: 'wishlist'});

var collectionSchema = new mongoose.Schema({
	username: String,
	artist: String,
	album: String,
	url: String
}, {collection: 'collection'});

var friendSchema = new mongoose.Schema({
	username: String,
	friendname: String
}, {collection: 'friendlist'});

var bioSchema = new mongoose.Schema({
	username: String,
	bio: String
}, {collection: 'bio'});

var bandSchema = new mongoose.Schema({
	username: String,
	bands: String
}, {collection: 'bands'});

mongoose.model('User', userSchema);
mongoose.model('Wishlist', wishlistSchema);
mongoose.model('Collection', collectionSchema);
mongoose.model('Friendlist', friendSchema);
mongoose.model('Bio', bioSchema);
mongoose.model('Bands', bandSchema);
