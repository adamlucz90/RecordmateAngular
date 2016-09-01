angular.
	module("recordmate").
	controller("registerController", ['$scope', '$http', 'login', '$location', function($scope, $http, login, $location){
	
		$scope.registerSubmit = function(){
				var username = $scope.username;
				var password = $scope.password;
				var confirm = $scope.confirmation;
				$scope.match = false;
				
				if(password !== confirm){
					$scope.match = true;
				}
				else{
					login.register(username, password).then(function success(response){
						console.log(response);
						if(response.data = "exists"){
							$scope.exists = true;
						}
						else{
							$location.path('/search');
						}
						//$location.path('/search');
					}, function error(response){
						console.log(response);
					});
				}
		};
		
	}]);
