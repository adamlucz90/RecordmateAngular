angular.
	module("recordmate").
	controller("registerController", ['$scope', '$location', 'userAuth', function($scope, $location, userAuth){
		//boolean to display passwords don't match
		$scope.match = false;
		
		$scope.user = {
			username: "",
			password: ""
		};
		
		$scope.onSubmit = function(){
			//check if passwords match
			if($scope.user.password !== $scope.confirmation){
				//if they don't match, display error
				$scope.match = true;
			}
			else{
			userAuth
				.register($scope.user)
				.success(function(data){
	      			if(data.user){
	      				$scope.userExists = true;
	      			}
	      			else{
	        			userAuth.saveToken(data.token);
	        			$location.path('/search');
	        		}
	      		});
			}
		};
		
	}]);
