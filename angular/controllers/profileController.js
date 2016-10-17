angular.
	module("recordmate").
	controller("profileController", ['$scope', '$location', 'userAuth', 'collection', 'Search', 'Profile', 'notifications',
		function($scope, $location, userAuth, collection, Search, Profile, notifications){
			//get the current user's username
			$scope.user = userAuth.getUser().name;
		
			//get the current user's email
			$scope.email = userAuth.getUser().email;
		
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
						/*
						 * map the wishlist items to new array
						 * of objects with the "id" element to
						 * keep track of active element in carousel
						 */
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
						//if wishlist is empty fill the carousel accordingly
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
						/*
						 * map the collection items to new array
						 * of objects with the "id" element to
						 * keep track of active element in carousel
						 */
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
						//if wishlist is empty fill the carousel accordingly
						$scope.collectItems.push({
							artist : "Nothing In Collection",
							album : "",
							url : "/nocover.jpg",
							id : $scope.collIndex
						});
					}
				});
			};
		
			//Search for user's friendlist
			var friendRender = function() {
				Profile.friendRender($scope.user).success(function(data) {
					//if there are friends fill friendslist, if not show empty friendslist message
					if (data.friends[0]) {
						$scope.friends = data.friends;
					} else {
						$scope.emptyFriend = true;
						$scope.friends = [];
					}
				});
			};
		
			//When a friend is clicked, the user is taken to their profile
			$scope.friendSearch = function(user) {
				userAuth.userSearch(user).then(function() {
					if ($location.path() == '/userProfile') {
						//rerun the $scope if already on the /userProfile page
						$scope.$broadcast('rerun');
					} else {
						//redirect to user's profile
						$location.path('/userProfile');
					}
		
				}, function(err) {
					//if the user doesn't exist '
					notifications.showError({
						message : err.message
					});
				});
			};
			
			//boolean to see if bio is being edited
			$scope.bioEditMode = false;
		
			//when edit button is clicked bioEditMode is turned on
			$scope.bioEdit = function() {
				$scope.bioEditMode = true;
			};
			
			/*
			 * When the user submits the bio
			 * it is updated and/or saved to
			 * the database
			 */
			$scope.bioSubmit = function() {
				var bioItem = {
					username : $scope.user,
					bio : $scope.bioInput
				};
		
				Profile.bioUpdate(bioItem).success(function(data) {
					/*
					 * if successful then turn of bioEditMode
					 * and rerender the bio with new info
					 */
					if (data.updated) {
						$scope.noBio = false;
						$scope.bioEditMode = false;
						bioRender();
					} else {
						//if error, notify user
						notifications.showError({
							message : "Whoops! Something went wrong!"
						});
					}
				});
			};
		
			//retrieve user's bio info and pass it to the page
			var bioRender = function() {
				Profile.bioRender($scope.user).success(function(data) {
					if (data.item[0]) {
						if (data.item[0].bio == "" || data.item[0].bio == null) {
							//if there's no bio info update the page
							$scope.noBio = true;
						} else {
							//if bio info exists pass it to the page
							$scope.bio = data.item[0].bio;
							$scope.bioInput = data.item[0].bio;
						}
					} else {
						//if this is the user's first time then they have no bio info
						$scope.noBio = true;
					}
				});
			}
			//boolean to see if band info is being edited
			$scope.bandEditMode = false;
		
			//when edit button is clicked bandEditMode is turned on
			$scope.bandEdit = function() {
				$scope.bandEditMode = true;
			};
		
			/*
			 * When the user submits the band info
			 * it is updated and/or saved to
			 * the database
			 */
			$scope.bandSubmit = function() {
				var bandItem = {
					username : $scope.user,
					bands : $scope.bandInput
				};
		
				Profile.bandUpdate(bandItem).success(function(data) {
					/*
					 * if successful then turn of bandEditMode
					 * and rerender the band info with new info
					 */
					if (data.updated) {
						$scope.noBands = false;
						$scope.bandEditMode = false;
						bandRender();
					} else {
						//if error, notify user
						notifications.showError({
							message : "Whoops! Something went wrong!"
						});
					}
				});
			};
		
			var bandRender = function() {
				Profile.bandRender($scope.user).success(function(data) {
					if (data.item[0]) {
						if (data.item[0].bands == "" || data.item[0].bands == null) {
							//if there are no bands then turn on noBands element
							$scope.noBands = true;
						} else {
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
						}
					} else {
						$scope.noBands = true;
					}
				});
		
				//when a user clicks on a band take them to top album page
				$scope.bandSearch = function(band) {
					Search.topAlbumSearch(band);
				};
			};
			
			//run all the render functions on page load
			bandRender();
			bioRender();
			wishRender();
			collectionRender();
			friendRender();
		}]);	
