angular
	.module("recordmate")
	.controller("wishlistController", ['$scope', '$location', 'userAuth', 'Search', 'collection', function($scope, $location,userAuth, Search, collection){
		
		//get username
		$scope.user = userAuth.getUser().name;
		
		//create variable to hold wishlist items
		$scope.items;
		
		//create variable to pass to render function
		var user = {user: $scope.user};
		
		//render the wishlist
		$scope.render = collection.wishlistRender(user).success(function(data){
			//if there are items fill wishlist, if not show empty wishlist message
			if(data.items[0]){
				$scope.items = data.items;
			}
			else{
				$scope.empty = true;
			}
		});
		
		//When user clicks remove, the function is called to remove the item from the wishlist
		$scope.wishRemove = function(artist, album){
			var item = {
				username: $scope.user,
				artist: artist,
				album: album
			};
			
			collection.wishlistRemove(item);
		};
		
		//adds the wishlist item to the collection, then deletes from the wishlist
		$scope.collectAdd = function(artist, album, url){
			var item = {
				username: $scope.user,
				artist: artist,
				album: album,
				url: url
			};
			
			collection.collectionAdd(item).success(function(data){
				collection.wishlistRemove(item);				
			});
		};
		
		//When user clicks on the album cover, call the albumsearch function and return them to album info page
		$scope.albumSearch = function(artist, album){
			Search.albumSet(artist, album).
				then(function(){
					Search.youtubeSet(artist, album).
					then(function(){
							$location.path('/albumInfo');
					});
				});			
		};
		
	}]);
