angular.
	module("recordmate").
	controller("profileController", ['$scope', '$location', 'userAuth', 'collection', 'Profile', 'notifications',
		function($scope, $location, userAuth, collection, Profile, notifications){
			
			$scope.user = userAuth.getUser().name;
			
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
				userAuth.userSearch(user).then(function (goToProfile) {
				    if (goToProfile) {
				    	if($location.path() == '/userProfile'){
				    		$scope.$broadcast('rerun');
				    	}
				    	else{
				      		$location.path('/userProfile');
				      	}
				    }
			  });
			}
			
			$scope.bioEditMode = false;
			
			$scope.bioEdit = function(){
								$scope.bioEditMode = true;
							};
			
			$scope.bioSubmit = function(){
								var bioItem = {
									username: $scope.user,
									bio: $scope.bioInput
								};
								
								Profile.bioUpdate(bioItem).success(function(data){
									if(data.updated){
										$scope.noBio = false;								
										$scope.bioEditMode = false;
										bioRender();
									}
									else{
										notifications.showError({message: "Whoops! Something went wrong!"});
									}
								});
							};
										
			var bioRender = function(){
				Profile.bioRender($scope.user).success(function(data){
					if(data.item[0]){
						if(data.item[0].bio == "" || data.item[0].bio == null){
							$scope.noBio = true;
						}
						else{
							$scope.bio = data.item[0].bio;
							$scope.bioInput = data.item[0].bio;
						}
					}
					else{
						$scope.noBio = true;
					}
				});
			}

			$scope.bandEditMode = false;
			
			$scope.bandEdit = function(){
								$scope.bandEditMode = true;
							};
			
			$scope.bandSubmit = function(){
								var bandItem = {
									username: $scope.user,
									bands: $scope.bandInput
								};
								
								Profile.bandUpdate(bandItem).success(function(data){
									if(data.updated){	
										$scope.noBands = false;							
										$scope.bandEditMode = false;
										bandRender();
									}
									else{
										notifications.showError({message: "Whoops! Something went wrong!"});
									}
								});
							};
										
			var bandRender = function(){
				Profile.bandRender($scope.user).success(function(data){
					if(data.item[0]){
						if(data.item[0].bands == "" || data.item[0].bands == null){
							$scope.noBands = true;
						}
						else{
							$scope.bands = data.item[0].bands;
							$scope.bandInput = data.item[0].bands;
						}
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
