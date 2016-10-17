angular.
	module("recordmate").
	controller("registerController", ['$scope', '$location', 'userAuth', 'notifications', 
		function($scope, $location, userAuth, notifications){
			//boolean to display passwords don't match
			$scope.match = false;
			
			//create object to pass to onSubmit function
			$scope.user = {
				username: "",
				email: "",
				password: ""
			};
			
			$scope.onSubmit = function(){
				//check if passwords match
				if($scope.user.password !== $scope.confirmation){
					//if they don't match, display error
					notifications.showError({message: "Your Passwords Do Not Match."});
				}
				else{
				userAuth
					.register($scope.user)
					.success(function(data){
		      			if(data.user){
		      				//if the username already exists, display error
		      				notifications.showError({message: "Username Already Exists."});
		      			}
		      			else{
		      				//on successful registration create a token, 
		      				//log the user in, and redirect to search page
		        			userAuth.saveToken(data.token);
		        			$location.path('/search');
		        		}
		      		});
				}
			};	
		}]);
