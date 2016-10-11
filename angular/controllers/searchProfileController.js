angular.
	module("recordmate").
	controller("searchProfileController", ['$scope', '$location', 'userAuth', 'collection', 'Profile',
		function($scope, $location, userAuth, collection, Profile){
			
			$scope.user = userAuth.searchUserGet();
			
			$scope.loggedIn = userAuth.isLogged();
			
			$scope.bio = Profile.bioRender($scope.user).success(function(data){
				console.log(data);
			})
			
			
			//define the variables required for the carousels				
			$scope.interval = 5000;
			$scope.active = 0;
			$scope.wishIndex = 0;
			$scope.collIndex = 0;
			
			//create variable to hold wishlist items
			$scope.wishItems = [];
			$scope.collectItems = [];
			
			//render the wishlist carousel
			var wishRender = function(){
					collection.wishlistRender($scope.user).success(function(data){
					//if there are items fill wishlist, if not show empty wishlist message
					if(data.items[0]){
						$scope.wishItems = data.items.map(function(obj){
							var item = {
								artist: obj.artist,
								album: obj.album,
								url: obj.url,
								id: $scope.wishIndex
							};
							
							$scope.wishIndex++;
							
							return item;
						});
					}
					else{
						$scope.wishItems.push({
							artist: "Nothing In Wishlist",
							album: "",
							url: "/nocover.jpg",
							id: $scope.wishIndex
						});
					}
				});
			};	


			//render the collection carousel
			var collectionRender = function(){
					collection.collectionRender($scope.user).success(function(data){
					//if there are items fill wishlist, if not show empty wishlist message
					if(data.items[0]){
						$scope.collectItems = data.items.map(function(obj){
							var item = {
								artist: obj.artist,
								album: obj.album,
								url: obj.url,
								id: $scope.collIndex
							};
							
							$scope.collIndex++;
							
							return item;
						});
					}
					else{
						$scope.collectItems.push({
							artist: "Nothing In Collection",
							album: "",
							url: "/nocover.jpg",
							id: $scope.collIndex
						});
					}
				});
			};
								
			wishRender();	
			collectionRender();		
		}]);