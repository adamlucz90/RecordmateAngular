angular.
	module("recordmate").
	controller("AlbumInfoController", ['$scope', '$sce', 'Search', 'userAuth', 'collection', function($scope, $sce, Search, userAuth, collection){
		
		$scope.loggedIn = userAuth.isLogged();
		
		$scope.albumInfo = Search.albumGet();
		
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
		
		var username = userAuth.getUser();
		
		var wishItem = {
			username: username.name,
			artist: $scope.albumInfo.album.artist,
			album: $scope.albumInfo.album.name,
			url: $scope.cover[3],
		};
		
		$scope.wishAble = false;
		
		$scope.wishlistAdd = function(){
			collection
				.wishlistAdd(wishItem)
				.error(function(err){
					console.log(err);
				})
				.then(function(){
					console.log("success!!!");
				});	
		};

		$scope.collectionAdd = function(){
			collection
				.collectionAdd(wishItem)
				.error(function(err){
					console.log(err);
				})
				.then(function(){
					console.log("success!!!");
				});	
		};
	}]);
