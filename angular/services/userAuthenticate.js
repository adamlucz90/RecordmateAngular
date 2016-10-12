angular
	.module("recordmate")
	.service("userAuth", ['$http', '$window', '$location', 'notifications',
		function($http, $window, $location, notifications){
			//creates variable to hold username for search
			var searchedUser = "";
		
			//saves the jwt to local storage variable
			var saveToken = function(token){
				$window.localStorage['user-token'] = token;
			};
			
			//returns the jwt token for authentication or data
			var getToken = function(){
				return $window.localStorage['user-token'];
			};
			
			//destroys the jwt token, effectively logging the user out
			var logout = function(){
				$window.localStorage.removeItem('user-token');
				$location.path('/search');
			};
			
			//checks to see if user is logged in
			var isLogged = function(){
				var token = getToken();
				var payload;
				
				if(token){
					//splits up and returns the payload portion of the jwt
					payload = token.split('.')[1];
					
					//decode the payload
					payload = $window.atob(payload);
					
					//JSON parse the payload
					payload = JSON.parse(payload);
					
					//returns if jwt is not expired
					return payload.exp > Date.now() / 1000;
				}
				else{
					return false;
				}
			};
			
			//returns info about the current user from jwt payload
			var getUser = function(){
				if(isLogged()){
					var token = getToken();
	
					//splits up and returns the payload portion of the jwt
					var payload = token.split('.')[1];
					
					//decode the payload
					payload = $window.atob(payload);
					
					//JSON parse the payload
					payload = JSON.parse(payload);		
					
					return {
						name: payload.name,
						email: payload.email
					};				
				}
			};
			
			//calls the API endpoint to register
			var register = function(user){
		      return $http.post('/api/register', user);			
			};
			
			//calls the API endpoint to login
			var login = function(user){
			    return $http.post('/api/login', user).success(function(data) {
	        		saveToken(data.token);
	      		});
	      	};
	      	
	      	var userSearch = function(user){
				var username = encodeURIComponent(user);
				
				var url = '/api/user/:username'
				  .replace(':username', username);	
				  	      		
	      		return $http.get(url).success(function(data){
	      			if(data.noUser){
	      				notifications.showError({message: data.noUser});
	      			}
	      			else{
	      				searchedUser = data;
	      				$location.path('/userProfile');
	      			}
	      		});
	      	};
	      	
	      	var searchUserGet = function(){
	      		return searchedUser;
	      	};
	      	
	      	
	      	return {
	      		saveToken: saveToken,
	      		getToken: getToken,
	      		logout: logout,
	      		isLogged: isLogged,
	      		getUser: getUser,
	      		register: register,
	      		login: login,
	      		userSearch: userSearch,
	      		searchUserGet: searchUserGet
	      	};
	}]);
