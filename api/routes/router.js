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
router.post('/friendlistRemove', ctrlFriend.friendlistRemove);
router.post('/friendlistRender', ctrl.Friend.friendlistRender);

// wishlist
router.post('/wishlistAdd', ctrlWishlist.wishlistAdd);
router.post('/wishlistRemove', ctrlWishlist.wishlistRemove);
router.post('/wishlistRender', ctrlWishlist.wishlistRender);

//collection
router.post('/collectionAdd', ctrlCollection.collectionAdd);
router.post('/collectionRemove', ctrlCollection.collectionRemove);
router.post('/collectionRender', ctrlCollection.collectionRender);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;