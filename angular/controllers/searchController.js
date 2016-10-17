angular.
	module('recordmate').
	controller('searchController', ['$scope', '$http', 'Search', '$location', 
		function($scope, $http, Search, $location){
			//function to run album search on submit
			$scope.albumSearch = function() {
				var artist = $scope.searchAlbum.artist;
				var album = $scope.searchAlbum.album;
				var format = $scope.albumFormat;
		
				Search.albumSet(artist, album, format);
			};
		
			//runs songSearch function on submit
			$scope.songSearch = function() {
				var artist = $scope.searchSong.artist;
				var track = $scope.searchSong.track;
				var format = $scope.songFormat;
		
				Search.songSet(artist, track, format);
		
			};
		
			//runs topAlbumSearch on submit
			$scope.artistSearch = function() {
				Search.topAlbumSearch($scope.artistSearch.artist);
			}; 
		}]);
	
