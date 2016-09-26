angular.
	module("recordmate").
	controller('loginController', ['$scope', '$location', 'userAuth', 'notifications',
	 function($scope, $location, userAuth, notifications){
		//boolean to display error message
		$scope.invalid = false;
		
		//variable to store error message
		$scope.error;
		
		$scope.user = {
			username: "",
			password: ""
		};
		
		$scope.onSubmit = function(){
			userAuth
				.login($scope.user)
				.error(function(err){
					//If there's an error display the message
					notifications.showError({message: err.message + "."});
				})
				.then(function(){
					//redirect back to search page
					$location.path('/search');
				});
		};
		
	}]);
