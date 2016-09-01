angular.
	module("recordmate").
	controller("AlbumInfoController", ['$scope', '$sce', 'Search', function($scope, $sce, Search){

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
	}]);
