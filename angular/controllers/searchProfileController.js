angular.
	module("recordmate").
	controller("searchProfileController", ['$scope', '$location', 'userAuth', 'collection', 'Profile',
		function($scope, $location, userAuth, collection, Profile){
			
			$scope.user = userAuth.searchUserGet();
			
			if(!$scope.user){
				$location.path('/search');
			}
			
			$scope.loggedIn = userAuth.isLogged();
			
			if($scope.loggedIn){
				var currUser = userAuth.getUser().name;
				
				if($scope.user == currUser){
					$location.path('/profile');
				}
				
				Profile.areFriends(currUser, $scope.user).success(function(data){
					if(data.areFriends){
						$scope.areFriends = true;
					}
					else{
						$scope.areFriends = false;
					}
				});
			}
			
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
								
			var friendRender = function(){
				Profile.friendRender($scope.user).success(function(data){
					//if there are friends fill friendslist, if not show empty friendslist message
					if(data.friends[0]){
						$scope.friends = data.friends;
					}
					else{
						$scope.emptyFriend = true;
						$scope.friends = [];
					}
				});
			};
			
			$scope.friendSearch = function(user){
				userAuth.userSearch(user);
			};
			
			$scope.addFriend = function(){
				var item = {
					username: currUser,
					friendname: $scope.user
				};
				
				Profile.friendAdd(item).then(function(){
					Profile.areFriends(currUser, $scope.user).success(function(data){
						if(data.areFriends){
							$scope.areFriends = true;
						}
						else{
							$scope.areFriends = false;
						}
					});
				});
			};

			$scope.removeFriend = function(){
				var item = {
					username: currUser,
					friendname: $scope.user
				};

				Profile.friendRemove(item).then(function(){
					Profile.areFriends(currUser, $scope.user).success(function(data){
						if(data.areFriends){
							$scope.areFriends = true;
						}
						else{
							$scope.areFriends = false;
						}
					});
				});
			};
			
			var bioRender = function(){
				Profile.bioRender($scope.user).success(function(data){
					if(data.item[0]){
						$scope.bio = data.item[0].bio;
					}
					else{
						$scope.noBio = true;
					}
				});
			}
										
			var bandRender = function(){
				Profile.bandRender($scope.user).success(function(data){
					if(data.item[0]){
						$scope.bands = data.item[0].bands;
						$scope.bandInput = data.item[0].bands;
					}
					else{
						$scope.noBands = true;
					}
				});
			}		
			
			bandRender();				
			bioRender();								
			wishRender();	
			collectionRender();
			friendRender();		
		}]);