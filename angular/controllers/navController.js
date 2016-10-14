angular
	.module("recordmate")
	.controller('navController', ['$scope', '$location', 'userAuth', 'notifications',
		function($scope, $location, userAuth, notifications){
			
			//boolean to check if user is logged in 
			$scope.loggedIn = userAuth.isLogged();
			
			//call to the logout function is userAuthenticate
			$scope.logout = function(){
				userAuth.logout();
				$scope.loggedIn = false;
			};
			
			$scope.userSearch = function(){
				userAuth.userSearch($scope.searchUser).then(function () {
				    	if($location.path() == '/userProfile'){
				    		$scope.$broadcast('rerun');
				    	}
				    	else{
				      		$location.path('/userProfile');
				      	}

			  }, function(err){
			  		 notifications.showError({message: err.message});
			  });
			}
		
	}]);
