angular
	.module("recordmate")
	.service("collection", ['$http', '$location', 'notifications',
		function($http, $location, notifications){
			
			var wishlistAdd = function(item){
				return $http.post('/api/wishlistAdd', item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "Item is already in your wishlist!"});
							}
						});
			};
			
			var wishlistRemove = function(item){
				return $http.post('/api/wishlistRemove', item);
			};
			
			var wishlistRender = function(user){
				return $http.post('/api/wishlistRender', user);
			};
			
			var collectionAdd = function(item){
				return $http.post('/api/collectionAdd', item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "Item is already in your collection!"});
							}
						})
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
