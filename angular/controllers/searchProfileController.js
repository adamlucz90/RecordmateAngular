angular.
	module("recordmate").
	controller("searchProfileController", ['$scope', '$location', 'userAuth', 'Search', 'collection', 'Profile',
		function($scope, $location, userAuth, Search, collection, Profile){
			//create a function that renders the page
			var pageRender = function() {
				//get the queried user's username
				$scope.user = userAuth.searchUserGet().user;
		
				//get the queried user's email
				$scope.email = userAuth.searchUserGet().email;
		
				//if the user got to the page incorrectly redirect
				if (!$scope.user) {
					$location.path('/search');
				}
		
				//if user is logged in, $scope variable is true
				$scope.loggedIn = userAuth.isLogged();
		
				/*
				 * if the user is logged in
				 * load the buttons/features to
				 * add and delete the queried user from
				 * the current user's friendlist
				 */
				if ($scope.loggedIn) {
					//get current user's username
					var currUser = userAuth.getUser().name;
		
					/*
					 * if the user searched for themselves,
					 * redirect them back to their own profile page
					 */
					if ($scope.user == currUser) {
						$location.path('/profile');
					}
		
					//checks if the queried user and current user are friends
					Profile.areFriends(currUser, $scope.user).success(function(data) {
						if (data.areFriends) {
							$scope.areFriends = true;
						} else {
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
				var wishRender = function() {
					collection.wishlistRender($scope.user).success(function(data) {
						//if there are items fill wishlist, if not show empty wishlist message
						if (data.items[0]) {
							$scope.wishItems = data.items.map(function(obj) {
								var item = {
									artist : obj.artist,
									album : obj.album,
									url : obj.url,
									id : $scope.wishIndex
								};
		
								$scope.wishIndex++;
		
								return item;
							});
						} else {
							$scope.wishItems.push({
								artist : "Nothing In Wishlist",
								album : "",
								url : "/nocover.jpg",
								id : $scope.wishIndex
							});
						}
					});
				};
		
				//render the collection carousel
				var collectionRender = function() {
					collection.collectionRender($scope.user).success(function(data) {
						//if there are items fill wishlist, if not show empty wishlist message
						if (data.items[0]) {
							$scope.collectItems = data.items.map(function(obj) {
								var item = {
									artist : obj.artist,
									album : obj.album,
									url : obj.url,
									id : $scope.collIndex
								};
		
								$scope.collIndex++;
		
								return item;
							});
						} else {
							$scope.collectItems.push({
								artist : "Nothing In Collection",
								album : "",
								url : "/nocover.jpg",
								id : $scope.collIndex
							});
						}
					});
				};
		
				var friendRender = function() {
					Profile.friendRender($scope.user).success(function(data) {
						//if there are friends fill friendslist, if not show empty friendslist message
						if (data.friends[0]) {
							$scope.friends = data.friends;
							$scope.emptyFriend = false;
						} else {
							$scope.emptyFriend = true;
							$scope.friends = [];
						}
					});
				};
		
				$scope.friendSearch = function(user) {
					userAuth.userSearch(user).then(function() {
						if ($location.path() == '/userProfile') {
							$scope.$broadcast('rerun');
						} else {
							$location.path('/userProfile');
						}
		
					}, function(err) {
						notifications.showError({
							message : err.message
						});
					});
				};
		
				//function to add queried user to current user's friedlist
				$scope.addFriend = function() {
					var item = {
						username : currUser,
						friendname : $scope.user
					};
		
					Profile.friendAdd(item).then(function() {
						Profile.areFriends(currUser, $scope.user).success(function(data) {
							if (data.areFriends) {
								$scope.areFriends = true;
							} else {
								$scope.areFriends = false;
							}
						});
					});
				};
		
				//function to remove queried user from current user's friendlist
				$scope.removeFriend = function() {
					var item = {
						username : currUser,
						friendname : $scope.user
					};
		
					Profile.friendRemove(item).then(function() {
						Profile.areFriends(currUser, $scope.user).success(function(data) {
							if (data.areFriends) {
								$scope.areFriends = true;
							} else {
								$scope.areFriends = false;
							}
						});
					});
				};
		
				//retrieve queried user's bio info and pass it to the page
				var bioRender = function() {
					Profile.bioRender($scope.user).success(function(data) {
						if (data.item[0]) {
							$scope.bio = data.item[0].bio;
						} else {
							$scope.noBio = true;
						}
					});
				}
				//retrieve queried user's band info and pass it to the page
				var bandRender = function() {
					Profile.bandRender($scope.user).success(function(data) {
						if (data.item[0]) {
							/*
							 * If there are bands, trim and map them
							 * into an array of individual strings to be
							 * used as links when the user clicks on them.
							 */
							$scope.bands = data.item[0].bands.trim().split(',').map(function(b) {
								return b.trim();
							}).filter(function(b) {
								return b.length;
							});
		
							$scope.bandInput = data.item[0].bands;
						} else {
							$scope.noBands = true;
						}
					});
				}
				//when a user clicks on a band take them to top album page
				$scope.bandSearch = function(band) {
					Search.topAlbumSearch(band);
				};
		
				//run all the render functions on page or $scope load
				bandRender();
				bioRender();
				wishRender();
				collectionRender();
				friendRender();
			};
		
			/*
			 *If the user is calling the search page
			 * from the search page re-render
			 * the page with the new info
			 */
			$scope.$on('rerun', function() {
				pageRender();
			});
		
			//Render the page
			pageRender(); 
		}]);
