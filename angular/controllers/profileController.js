angular.
	module("recordmate").
	controller("profileController", ['$scope', '$location', 'userAuth', 'collection', 
		function($scope, $location, userAuth, collection){
			$scope.user = userAuth.getUser().name;
		}]);
	
