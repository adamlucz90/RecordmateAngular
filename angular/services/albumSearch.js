angular.
	module("recordmate").
	factory("Search", ['$location', '$http', '$q', 'notifications', 
		function SearchFactory($location, $http, $q, notifications){
		
			//variables that will be filled and returned to controllers
			var albumInfo = {};
			var youtubeInfo = {};
			var ebayInfo = {};
			var artistInfo = {};
			var genre;
		
			//Calls the Last.fm api to search for album Info
			function albumSet(artist, album, format) {		
				return $http.get("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d17e980eb9b1ea8c7dd060939eac110d&artist=" + artist + "&album=" + album + "&format=json").success(function(data) {
					if (data.error) {
						notifications.showError({
							message : "Album Not Found. Please Search Again."
						});
					} else {
						albumInfo = data;
		
						//call the youtubeSet function
						youtubeSet(artist, album).then(function(data) {
							//Call the ebaySet Function
							ebaySet(artist, album, format).then(function(data) {
								//redirect user to albumInfo page when finished
								$location.path('/albumInfo');
							});
						});
					}
				});
			};
		
			//Calls the Last.fm api to get info on a specific song
			function songSet(artist, track, format) {
				return $http.get("https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=d17e980eb9b1ea8c7dd060939eac110d&artist=" + artist + "&track=" + track + "&format=json").success(function(data) {
					if (data.error) {
						notifications.showError({
							message : "Song Not Found. Please Search Again."
						});
					} else {
						//run the album search function to then fill in the rest of the info
						albumSet(data.track.album.artist, data.track.album.title, format);
					}
				});
			};
		
			//Calls the youtube search api to get video info
			function youtubeSet(artist, album) {
				return $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=" + artist + "+" + album + "&key=AIzaSyDVrxcnUUeCzL0Ek8vsZjWkveDDxIsNuD0").then(function success(response) {
					youtubeInfo = response.data;
				}, function error(response) {
					console.log(response);
				});
			};
		
			//calls the eBay Finding Service API to get eBay auction results
			function ebaySet(artist, album, format) {
				//determine if user passed a format prefernce
				if (format === undefined)
					var keyword = artist + " " + album;
				else
					var keyword = artist + " " + album + " " + format;
		
				var url = encodeURI("https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=AdamLucz-RecordMa-PRD-b2f871c7c-e630c56d&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=JSON_CALLBACK&REST-PAYLOAD&keywords=" + keyword + "&responseencoding=JSON&paginationInput.entriesPerPage=5");
				return $http.jsonp(url).success(function(response) {
					ebayInfo = response.findItemsByKeywordsResponse[0].searchResult[0].item;
				});
			};
		
			//Calls the Last.fm API to return the topAlbums of a specific artist
			function topAlbumSearch(artist) {
				$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=d17e980eb9b1ea8c7dd060939eac110d&format=json").success(function(data) {
					if (data.error) {
						notifications.showError({
							message : "Artist Not Found. Please Search Again."
						});
					} else {
						artistInfo = data.topalbums.album;
		
						//redirect the user to the artistInfo page when finished
						$location.path('/artistInfo');
					}
				})
			};
		
			//Calls the Last.fm API to get the top albums of a specific genre
			function genreTagSearch(tag) {
				$http.get("http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=" + tag + "&api_key=d17e980eb9b1ea8c7dd060939eac110d&format=json").success(function(data) {
					if (data.error) {
						notifications.showError({
							message : "Whoops! Something went wrong. Please try again."
						});
					} else {
						genre = tag;
						artistInfo = data.albums.album;
		
						//redirect the user to the artistInfo page when finished
						$location.path('/artistInfo');
					}
				});
			};
		
			function albumGet() {
				return albumInfo;
			};
		
			function youtubeGet() {
				return youtubeInfo;
			};
		
			function ebayGet() {
				return ebayInfo;
			};
		
			function artistGet() {
				return artistInfo;
			};
		
			function genreGet() {
				return genre;
			};
		
			return {
				albumSet : albumSet,
				songSet : songSet,
				youtubeSet : youtubeSet,
				ebaySet : ebaySet,
				albumGet : albumGet,
				youtubeGet : youtubeGet,
				ebayGet : ebayGet,
				topAlbumSearch : topAlbumSearch,
				artistGet : artistGet,
				tagSearch : genreTagSearch,
				genreGet : genreGet
			}
		}]);
