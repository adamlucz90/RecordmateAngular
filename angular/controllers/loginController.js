angular.
	module("recordmate").
	controller('loginController', ['$scope', '$location', 'userAuth', function($scope, $location, userAuth){
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
					$scope.error = err.message;
					$scope.invalid = true;
				})
				.then(function(){
					$location.path('/search');
				});
		};
		
	}]);
