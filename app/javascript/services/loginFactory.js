angular.
	module("recordmate").
	factory("login", ['$http', function($http){
		var currentUser;
		
		
		function register(username, password){
			var url = "/reg/" + username + "/" + password;
			return $http.get(url)
		}
		
		return {
			register: register
		}
	}]);
