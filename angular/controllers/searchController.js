angular.
	module('recordmate').
	controller('searchController', ['$scope', '$http', 'Search', '$location', 
		function($scope, $http, Search, $location){
			
		
		//function to run album search on submit
		$scope.albumSearch =  function(){
			var artist = $scope.searchAlbum.artist;
			var album = $scope.searchAlbum.album;
			var format = Object.keys($scope.albumFormat);
			console.log(format);
			Search.albumSet(artist, album, format);
		};
		
		$scope.songSearch = function(){
			var format = Object.keys($scope.songFormat);
			
			Search.songSet($scope.searchSong.artist, $scope.searchSong.track, format);

		};
		
		$scope.artistSearch = function(){
			Search.topAlbumSearch($scope.artistSearch.artist);
		};
	}]);
	
