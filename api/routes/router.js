var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/authenticate');
var ctrlWishlist = require('../controllers/wishlist');
var ctrlCollection = require('../controllers/collection');
var ctrlFriend = require('../controllers/friendlist');
var ctrlBio = require('../controllers/profile');

//profile
router.post('/user/:username/bio', ctrlBio.bioUpdate);
router.get('/user/:username/bio', ctrlBio.bioRender);

//friendlist
router.post('/user/:username/friendlist', ctrlFriend.friendlistAdd);
router.delete('/user/:username/friendlist/friend/:friendname', ctrlFriend.friendlistRemove);
router.get('/user/:username/friendlist', ctrlFriend.friendlistRender);

// wishlist
router.post('/user/:username/wishlist', ctrlWishlist.wishlistAdd);
router.delete('/user/:username/wishlist/artist/:artist/album/:album', ctrlWishlist.wishlistRemove);
router.get('/user/:username/wishlist', ctrlWishlist.wishlistRender);

//collection
router.post('/user/:username/collection', ctrlCollection.collectionAdd);
router.delete('/user/:username/collection/artist/:artist/album/:album', ctrlCollection.collectionRemove);
router.get('/user/:username/collection', ctrlCollection.collectionRender);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;