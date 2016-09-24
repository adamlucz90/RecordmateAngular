angular.
	module("recordmate").
	controller("artistInfoController", ['$scope', 'Search', 'collection', 'userAuth', function($scope, Search, collection, userAuth){
		
		var user = userAuth.getUser().name;
		
		$scope.albums = Search.artistGet();
		
		$scope.albumSearch = function(artist, album){
			Search.albumSet(artist, album);
		}
		
		//adds the wishlist item to the collection
		$scope.collectAdd = function(artist, album, url){
			var item = {
				username: user,
				artist: artist,
				album: album,
				url: url
			};
			
			collection.collectionAdd(item);
		};		

		$scope.wishAdd = function(artist, album, url){
			var item = {
				username: user,
				artist: artist,
				album: album,
				url: url
			};
			
			collection.wishlistAdd(item);
		};		
	}]);
