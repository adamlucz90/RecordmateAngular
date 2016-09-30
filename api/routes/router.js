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

//friendlist
router.post('/friendlistAdd', ctrlFriend.friendlistAdd);
router.delete('/friendlistRemove', ctrlFriend.friendlistRemove);
router.get('/friendlistRender', ctrlFriend.friendlistRender);

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