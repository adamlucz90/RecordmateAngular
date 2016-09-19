angular
	.module("recordmate")
	.service("collection", ['$http', '$location', function($http, $location){
		
		var wishlistAdd = function(item){
			return $http.post('/api/wishlistAdd', item);
		};
		
		var wishlistRemove = function(item){
			return $http.post('/api/wishlistRemove', item);
		};
		
		var wishlistRender = function(user){
			return $http.post('/api/wishlistRender', user);
		};
		
		var collectionAdd = function(item){
			return $http.post('/api/collectionAdd', item);
		};
		
		var collectionRemove = function(item){
			return $http.post('/api/collectionRemove', item);
		};
		
		var collectionRender = function(user){
			return $http.post('/api/collectionRender', user);
		};		
		
		return {
			wishlistAdd: wishlistAdd,
			wishlistRemove: wishlistRemove,
			wishlistRender: wishlistRender,
			collectionAdd: collectionAdd,
			collectionRemove: collectionRemove,
			collectionRender: collectionRender			
		};
		
	}]);
