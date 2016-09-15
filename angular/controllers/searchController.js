angular.
	module('recordmate').
	controller('searchController', ['$scope', '$http', 'Search', '$location', function($scope, $http, Search, $location){
		
		//function to run album search on submit
		$scope.search =  function(){
			var artist = $scope.searchAlbum.artist;
			var album = $scope.searchAlbum.album;
			var format = $scope.format;
			
			Search.albumSet(artist, album).
				then(function(){
					Search.youtubeSet(artist, album).
					then(function(){
							$location.path('/albumInfo');
					});
				});
		};
		
		$scope.songSearch = function(){
			var format = $scope.format;
			
			Search.albumSet($scope.songAlbum.artist, $scope.songAlbum.album).
				then(function(){
					Search.youtubeSet($scope.searchAlbum.artist, $scope.searchAlbum.album).
					then(function(){
							$location.path('/albumInfo');
					});
				});

		};
	}]);
	
