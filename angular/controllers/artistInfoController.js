angular.
	module("recordmate").
	controller("artistInfoController", ['$scope', '$location', 'Search', 'collection', 'userAuth', 
		function($scope, $location, Search, collection, userAuth){
			
			var user; 
			
			$scope.isLoggedIn = userAuth.isLogged();
			
			if($scope.isLoggedIn){
				user = userAuth.getUser().name;
			};
			
			$scope.albums = Search.artistGet();
			
			//ensure user got to the page properly
			if($scope.albums[0]){

				//check to see if user is searching for artist or genre
				//then fill in the title accordingly
				if($scope.albums[1].playcount){
					$scope.title = $scope.albums[1].artist.name;
				}
				else
				{
					$scope.title = Search.genreGet();
				}
				
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
			}
			//otherwise redirect the uer back to the homepage
			else{
				$location.path('/search');
			}	
	}]);
