angular
	.module("recordmate")
	.service("collection", ['$http', '$location', 'notifications',
		function($http, $location, notifications){
			
			var wishlistAdd = function(item){
				var username = encodeURIComponent(item.username);
				
				var url = '/api/user/:username/wishlist'
				  .replace(':username', username);					
				
				return $http.post(url, item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "Item is already in your wishlist!"});
							}
							else{
								notifications.showSuccess({message: "Item successfully added to your wishlist!"});
							}
						});
			};
			
			var wishlistRemove = function(item){
				var username = encodeURIComponent(item.username);
				var artist = encodeURIComponent(item.artist);				
				var album = encodeURIComponent(item.album);
				
				var url = '/api/user/:username/wishlist/artist/:artist/album/:album'
				  .replace(':username', username)
				  .replace(':artist', artist)
				  .replace(':album', album);				
				
				return $http.delete(url)
					.success(function(data){
						notifications.showSuccess({message: "Item successfully removed from your wishlist"});
					});
			};
			
			var wishlistRender = function(user){
				const username = encodeURIComponent(user);
				return $http.get('/api/user/' + username + '/wishlist');
			};
			
			var collectionAdd = function(item){
				var username = encodeURIComponent(item.user);
				
				var url = '/api/user/:username/collection'
				  .replace(':username', username);				
				
				
				return $http.post(url, item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "Item is already in your collection!"});
							}
							else{
								notifications.showSuccess({message: "Item successfully added to your collection!"});
							}
							
						});
			};
			
			var collectionRemove = function(item){
				var username = encodeURIComponent(item.username);
				var artist = encodeURIComponent(item.artist);				
				var album = encodeURIComponent(item.album);
				
				var url = '/api/user/:username/collection/artist/:artist/album/:album'
				  .replace(':username', username)
				  .replace(':artist', artist)
				  .replace(':album', album);
				
				return $http.delete(url)
					.success(function(data){
						notifications.showSuccess({message: "Item successfully removed from your collection!"});
					});
			};
			
			var collectionRender = function(user){
				const username = encodeURIComponent(user);
				return $http.get('/api/user/' + username + '/collection');
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
