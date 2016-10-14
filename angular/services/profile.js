angular.
	module("recordmate").
	service("Profile", ['$http', 'notifications', 
		function($http, notifications){
			
			//function to add a friend to a user's friendlist
			var friendlistAdd = function(item){
				var username = encodeURIComponent(item.username);
				
				var url = '/api/user/:username/friendlist'
				  .replace(':username', username);					
				
				return $http.post(url, item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "You are already friends with "});
							}
							else{
								notifications.showSuccess({message: "You are now friends with "});
							}
						});
			};
			
			//function to remove a friend from a user's friendlist
			var friendlistRemove = function(item){
				var username = encodeURIComponent(item.username);
				var friendname = encodeURIComponent(item.friendname);				
				
				var url = '/api/user/:username/friendlist/friend/:friendname'
				  .replace(':username', username)
				  .replace(':friendname', friendname);				
				
				return $http.delete(url)
					.success(function(data){
						notifications.showSuccess({message: item.friend + " successfully removed from your friendslist"});
					});
			};
			
			//function to retrieve all the friends from a user's friendlist
			var friendlistRender = function(user){
				const username = encodeURIComponent(user);
				return $http.get('/api/user/' + username + '/friendlist');
			};
			
			var areFriends = function(username, friendname){
				var username = encodeURIComponent(username);
				var friendname = encodeURIComponent(friendname);

				var url = '/api/user/:username/friendlist/friend/:friendname'
				  .replace(':username', username)
				  .replace(':friendname', friendname);
				  
				return $http.get(url);
			};
			
			//function to retrieve a user's current bio, if any
			var bioRender = function(user){
				const username = encodeURIComponent(user);
				return $http.get('/api/user/' + username + '/bio');
			};
			
			//function to update a user's bio
			var bioUpdate = function(bioItem){
				var username = encodeURIComponent(bioItem.username);
				
				var url = '/api/user/:username/bio'
				  .replace(':username', username);					
				
				return $http.post(url, bioItem);				
			}
			
			//function to retrieve a user's current bio, if any
			var bandRender = function(user){
				const username = encodeURIComponent(user);
				return $http.get('/api/user/' + username + '/bands');
			};
			
			//function to update a user's bio
			var bandUpdate = function(bandItem){
				var username = encodeURIComponent(bandItem.username);
				
				var url = '/api/user/:username/bands'
				  .replace(':username', username);					
				
				return $http.post(url, bandItem);				
			}
			
			
			return{
				friendAdd: friendlistAdd,
				friendRemove: friendlistRemove,
				friendRender: friendlistRender,
				areFriends: areFriends,
				bioRender: bioRender,
				bioUpdate: bioUpdate,
				bandRender: bandRender,
				bandUpdate: bandUpdate
			}			
		}]);
