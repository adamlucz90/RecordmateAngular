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
		}]);
	
