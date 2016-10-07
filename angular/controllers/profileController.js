angular.
	module("recordmate").
	controller("profileController", ['$scope', '$location', 'userAuth', 'collection',
		function($scope, $location, userAuth, collection){
			
			$scope.user = userAuth.getUser().name;
			
			$scope.bioEditMode = false;
			
			$scope.bioEdit = function(){
								$scope.bioEditMode = true;
							};
			
			$scope.bioSumbit = function(){
								console.log($scope.bioInput);
								$scope.bioEditMode = false;
							};
							
			$scope.interval = 5000;
			
			$scope.active = 0;
			
			$scope.index = 0;
			
			//create variable to hold wishlist items
			$scope.items = [];
			
			//render the wishlist
			var wishRender = function(){
					collection.wishlistRender($scope.user).success(function(data){
					//if there are items fill wishlist, if not show empty wishlist message
					if(data.items[0]){
						$scope.items = data.items.map(function(obj){
							var item = {
								artist: obj.artist,
								album: obj.album,
								url: obj.url,
								id: $scope.index
							};
							
							$scope.index++;
							
							return item;
						});
						console.log($scope.items);
					}
					else{
						$scope.empty = true;
					}
				});
		};	
		
		wishRender();			
		}]);
	
