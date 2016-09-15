angular
	.module("recordmate")
	.service("collection", ['$http', '$location', function($http, $location){
		
		var wishlistAdd = function(item){
			return $http.post('/api/wishlistAdd', item).success(function(data){
	        console.log("added");
	      });
		};
		
		return {
			wishlistAdd: wishlistAdd
		};
		
	}]);
