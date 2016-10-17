angular.
	module("recordmate").
	controller('navController', ['$scope', '$location', 'userAuth', 'notifications',
		function($scope, $location, userAuth, notifications){
			//boolean to check if user is logged in
			$scope.loggedIn = userAuth.isLogged();
		
			//call to the logout function is userAuthenticate
			$scope.logout = function() {
				userAuth.logout();
				$scope.loggedIn = false;
			};
		
			/*
			 * When a username is queried in the
			 * searchbar the function looks for that
			 * user and acts accordingly
			 */
			$scope.userSearch = function() {
				userAuth.userSearch($scope.searchUser).then(function() {
					if ($location.path() == '/userProfile') {
						/*
						 * if the page doesn't need to
						 * be reloaded but just the $scope
						 * the broadcast is called and picked up
						 * in the searchProfileController
						 */
						$scope.$broadcast('rerun');
					} else {
						//redirect user to the userProfile page
						$location.path('/userProfile');
					}
		
				}, function(err) {
					//if the queried user doesn't exist alert the user
					notifications.showError({
						message : err.message
					});
				});
			}	
		}]);
