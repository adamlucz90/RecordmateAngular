angular.
	module("recordmate").
	controller("AlbumInfoController", ['$scope', '$sce', 'Search', 'userAuth', 'collection', 
		function($scope, $sce, Search, userAuth, collection){
			
			$scope.loggedIn = userAuth.isLogged();
			
			$scope.albumInfo = Search.albumGet();
			
			//ensure there is a wiki element
			if($scope.albumInfo.album.wiki){
				$scope.wiki = $scope.albumInfo.album.wiki.summary;
			}
			else{
				$scope.wiki = false;
			}
			
			$scope.tracks = $scope.albumInfo.album.tracks.track.map(function(obj){
	        					return obj.name;
	    					});
	    	
	    	$scope.tags = $scope.albumInfo.album.tags.tag.map(function(obj) {
	        					return obj.name;
	    					});	
	    								
			$scope.cover = $scope.albumInfo.album.image.map(function(obj) {
	        					return obj["#text"];
	    					});
	    					
			$scope.youtubeInfo = Search.youtubeGet();
			
			$scope.videos = $scope.youtubeInfo.items.map(function(obj){
				        var id = obj.id.videoId;
	        			var url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + id);
	        			return {link: url};
			});
			
			$scope.ebayInfo = Search.ebayGet();
			console.log($scope.ebayInfo);
			
			if($scope.loggedIn){
				var username = userAuth.getUser();
				
				
				var wishItem = {
					username: username.name,
					artist: $scope.albumInfo.album.artist,
					album: $scope.albumInfo.album.name,
					url: $scope.cover[3],
				};
				
				$scope.wishlistAdd = function(){
					collection.wishlistAdd(wishItem);
				};
		
				$scope.collectionAdd = function(){
					collection.collectionAdd(wishItem);
				};
			};
	}]);
