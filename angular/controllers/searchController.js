angular.
	module('recordmate').
	controller('searchController', ['$scope', '$http', 'Search', '$location', function($scope, $http, Search, $location){
		
		//function to run album search on submit
		$scope.search =  function(){
			var artist = $scope.searchAlbum.artist;
			var album = $scope.searchAlbum.album;
			var format = $scope.format;
			
			Search.albumSet(artist, album);
		};
		
		$scope.songSearch = function(){
			var format = $scope.format;
			
			Search.songSet($scope.searchSong.artist, $scope.searchSong.track);

		};
		
		$scope.artistSearch = function(){
			Search.topAlbumSearch($scope.artistSearch.artist);
		};
	}]);
	
