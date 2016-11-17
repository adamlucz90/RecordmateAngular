angular.
	module("recordmate").
	service("comments", ['$http', 'notifications',
		function($http, notifications){
			var commentAdd = function(comment) {
				var username = encodeURIComponent(comment.username);
				var artist = encodeURIComponent(comment.artist);
				var album = encodeURIComponent(comment.album);
		
				var url = '/api/user/:username/artist/:artist/album/:album/comment'.replace(':username', username).replace(':artist', artist).replace(':album', album);
		
				return $http.post(url, comment).success(function(data) {
					notifications.showSuccess({
						message : "Comment Added!"
					});
				});
			}
			var commentRender = function(artist, album) {
				var artist = encodeURIComponent(artist);
				var album = encodeURIComponent(album);
		
				var url = '/api/artist/:artist/album/:album/comment'.replace(':artist', artist).replace(':album', album);
				return $http.get(url);
			}
			
			var deleteComment = function(comment){
				var username = encodeURIComponent(comment.username);
				var artist = encodeURIComponent(comment.artist);
				var album = encodeURIComponent(comment.album);
				
				var url = '/api/user/:username/artist/:artist/album/:album/commentDelete'.replace(':username', username).replace(':artist', artist).replace(':album', album);
				return $http.post(url, comment).success(function(data) {
					notifications.showError({
						message : "Comment Deleted!"
					});
				});
			}
			
			
			return{
				commentAdd: commentAdd,
				commentRender: commentRender,
				deleteComment: deleteComment
			}
		}]);

