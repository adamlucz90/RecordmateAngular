angular.
	module("recordmate").
	service("Profile", ['$http', 
		function($http){
			
			//function to add a friend to a user's friendlist
			var friendlistAdd = function(item){
				var username = encodeURIComponent(item.username);
				
				var url = '/api/user/:username/friendlist'
				  .replace(':username', username);					
				
				return $http.post(url, item)
						.success(function(data){
							if(data.notAdded){
								notifications.showError({message: "You are already friends with " + item.friendname});
							}
							else{
								notifications.showSuccess({message: "You are now friends with " + item.friendname});
							}
						});
			};
			
			//function to remove a friend from a user's friendlist
			var friendlistRemove = function(item){
				var username = encodeURIComponent(item.username);
				var friendname = encodeURIComponent(item.friend);				
				
				var url = '/api/user/:username/friendlist/friend/:friendname'
				  .replace(':username', username)
				  .replace(':friendname', friendname)				
				
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
			
			
			return{
				friendAdd: friendlistAdd,
				friendRemove: friendlistRemove,
				friendRender: friendlistRender,
				bioRender: bioRender,
				bioUpdate: bioUpdate
			}			
		}]);
