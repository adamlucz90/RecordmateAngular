angular.
	module("recordmate").
	controller("artistInfoController", ['$scope', '$location', 'Search', 'collection', 'userAuth', 
		function($scope, $location, Search, collection, userAuth){
			//create element to hold the user name
			var user;
		
			//if user is logged in then $scope element is true
			$scope.isLoggedIn = userAuth.isLogged();
		
			//if the user is logged in set the variable to their username
			if ($scope.isLoggedIn) {
				user = userAuth.getUser().name;
			};
		
			//retrieve the album information
			$scope.albums = Search.artistGet();
		
			//ensure user got to the page properly
			if ($scope.albums[0]) {
		
				//check to see if user is searching for artist or genre
				//then fill in the title accordingly
				if ($scope.albums[1].playcount) {
					$scope.title = $scope.albums[1].artist.name;
				} 
				else {
					$scope.title = Search.genreGet();
				}
		
				$scope.albumSearch = function(artist, album) {
					Search.albumSet(artist, album);
				}
				//adds the desired album item to the user's collection
				$scope.collectAdd = function(artist, album, url) {
					var item = {
						username : user,
						artist : artist,
						album : album,
						url : url
					};
		
					collection.collectionAdd(item);
				};
		
				//adds the desired album item to the user's wishlist
				$scope.wishAdd = function(artist, album, url) {
					var item = {
						username : user,
						artist : artist,
						album : album,
						url : url
					};
		
					collection.wishlistAdd(item);
				};
			}
			//otherwise redirect the uer back to the homepage
			else {
				$location.path('/search');
			}	
		}]);
