angular.
	module("recordmate").
	controller("AlbumInfoController", ['$scope', '$sce', '$location', 'Search', 'userAuth', 'collection', 'comments',
		function($scope, $sce, $location, Search, userAuth, collection, comments){
			//If the user is logged in the $scope element will be true
			$scope.loggedIn = userAuth.isLogged();
		
			//retrieves album info
			$scope.albumInfo = Search.albumGet();
		
			//ensure user got to page properly
			if ($scope.albumInfo.album) {
		
				//ensure there is a wiki element
				if ($scope.albumInfo.album.wiki) {
					$scope.wiki = $scope.albumInfo.album.wiki.summary;
				} else {
					$scope.wiki = false;
				}
		
				//map the album tracks to a $scope variable
				$scope.tracks = $scope.albumInfo.album.tracks.track.map(function(obj) {
					return obj.name;
				});
		
				//map the genre tags to a $scope variable
				$scope.tags = $scope.albumInfo.album.tags.tag.map(function(obj) {
					return obj.name;
				});
		
				//when a genre tag is clicked the function is called
				$scope.tagSearch = function(tag) {
					Search.tagSearch(tag);
				};
		
				//retrieve proper album cover
				$scope.cover = $scope.albumInfo.album.image.map(function(obj) {
					return obj["#text"];
				});
		
				//retrieve the youtube info
				$scope.youtubeInfo = Search.youtubeGet();
		
				//map the youtube URL's to a $scope element
				$scope.videos = $scope.youtubeInfo.items.map(function(obj) {
					var id = obj.id.videoId;
					var url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + id);
					return {
						link : url
					};
				});
		
				//retrieve the ebay info and attatch to a $scope element
				$scope.ebayInfo = Search.ebayGet();
		
				/*
				 * if the user is logged in then show
				 * the "add to wishlist" and "add to collection"
				 * buttons
				 */
				if ($scope.loggedIn) {
					var username = userAuth.getUser();
		
					//create object to pass to the Add functions
					var wishItem = {
						username : username.name,
						artist : $scope.albumInfo.album.artist,
						album : $scope.albumInfo.album.name,
						url : $scope.cover[3],
					};
		
					//Add object to user's wishlist
					$scope.wishlistAdd = function() {
						collection.wishlistAdd(wishItem);
					};
		
					//Add object to user's collection
					$scope.collectionAdd = function() {
						collection.collectionAdd(wishItem);
					};
				};
				
				//Comment section
				var commentRender = function() {
					comments.commentRender($scope.albumInfo.album.artist, $scope.albumInfo.album.name).success(function(data){
						var commentNum = data.comments.length;

						$scope.comments = data.comments;
						
						if(commentNum == 0){
							$scope.commentCount = "No comments on this album yet!";
						}
						else{
							if(commentNum == 1){
								$scope.commentCount = commentNum + " comment";
							}
							else{
								$scope.commentCount = commentNum + " comments";
							}
						}
					});
				};
				
				$scope.commentSubmit = function(){
					var username = userAuth.getUser();
					
					var commentItem = {
						username: username.name,
						email: username.email,
						artist: $scope.albumInfo.album.artist, 
						album: $scope.albumInfo.album.name,
						comment: $scope.commentInput
					};
					
					comments.commentAdd(commentItem).success(function(data){
						commentRender();
					});
				};
				
			//When a comment username is clicked, the user is taken to their profile
			$scope.profileSearch = function(user) {
				userAuth.userSearch(user).then(function() {
					if ($location.path() == '/userProfile') {
						//rerun the $scope if already on the /userProfile page
						$scope.$broadcast('rerun');
					} else {
						//redirect to user's profile
						$location.path('/userProfile');
					}
		
				}, function(err) {
					//if the user doesn't exist '
					notifications.showError({
						message : err.message
					});
				});
			};				
				
				commentRender();
				
				
			} else {
				//if no album info redirect back to home
				$location.path('/search');
			}

		}]);

