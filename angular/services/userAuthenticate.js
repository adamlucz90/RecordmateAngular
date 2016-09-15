angular
	.module("recordmate")
	.service("userAuth", ['$http', '$window', '$location', function($http, $window, $location){
		
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
					name: payload.name
				};				
			}
		};
		
		//calls the API endpoint to register
		var register = function(user){
	      return $http.post('/api/register', user).success(function(data){
	        saveToken(data.token);
	      });			
		};
		
		//calls the API endpoint to login
		var login = function(user){
		    return $http.post('/api/login', user).success(function(data) {
		    	
        		saveToken(data.token);
      		});
      	};
      	
      	return {
      		saveToken: saveToken,
      		getToken: getToken,
      		logout: logout,
      		isLogged: isLogged,
      		getUser: getUser,
      		register: register,
      		login: login
      	};
	}]);
