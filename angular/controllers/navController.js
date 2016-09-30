angular
	.module("recordmate")
	.controller('navController', ['$scope', '$location', 'userAuth', 
		function($scope, $location, userAuth){
			
			//boolean to check if user is logged in 
			$scope.loggedIn = userAuth.isLogged();
			
			//call to the logout function is userAuthenticate
			$scope.logout = function(){
				userAuth.logout();
				$scope.loggedIn = false;
			};
		
	}])
