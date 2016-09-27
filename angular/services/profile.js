angular.
	module("recordmate").
	service("Profile", ['$http', 
		function($http){

			var friendlistAdd = function(friend){
				return $http.post('/api/friendlistAdd', friend);
			};
			
			var friendlistRemove = function(item){
				return $http.post('/api/friendlistRemove', friend);
			};
			
			var friendlistRender = function(user){
				return $http.post('/api/friendlistRender', friend);
			};			
		}]);
