angular
	.module("recordmate")
	.controller("collectionController", ['$scope', '$location', 'userAuth', 'Search', 'collection', 
		function($scope, $location,userAuth, Search, collection){
			//get username
			$scope.user = userAuth.getUser().name;
		
			//create variable to hold wishlist items
			$scope.items
		
			//create variable to pass to render function
			//var user = {user: $scope.user};
		
			//render the wishlist
			var render = function() {
				collection.collectionRender($scope.user).success(function(data) {
					//if there are items fill wishlist, if not show empty wishlist message
					if (data.items[0]) {
						$scope.items = data.items;
					} else {
						$scope.empty = true;
						$scope.items = [];
					}
				});
			};
		
			//When user clicks remove, the function is called to remove the item from the wishlist
			$scope.collectRemove = function(artist, album) {
				var item = {
					username : $scope.user,
					artist : artist,
					album : album
				};
		
				collection.collectionRemove(item).then(function() {
					render();
				});
		
			}
			//When user clicks on the album cover, call the albumsearch function and return them to album info page
			$scope.albumSearch = function(artist, album) {
				Search.albumSet(artist, album);
			}
			//calls the render function on page load
			render(); 
		}]);