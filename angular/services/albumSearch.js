angular.
	module("recordmate").
	factory("Search", ['$location', '$http', 'notifications', 
		function SearchFactory($location, $http, notifications){
			var albumInfo = {};
			var youtubeInfo = {};
			var ebayInfo = {};
			var artistInfo = {};
			
				function albumSet(artist, album){
					return $http.get("https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=d17e980eb9b1ea8c7dd060939eac110d&artist=" + artist + "&album=" + album + "&format=json").
				 		success(function(data){
				 			if(data.error){
				 			 	notifications.showError({message: "Album Not Found. Please Search Again."});	
				 			}
				 			else{
				 			albumInfo = data;
				 			youtubeSet(artist, album)
				 				.then(function(data){
				 					$location.path('/albumInfo');
				 				});
				 			}
				 		});
				};
	
				function songSet(artist, track){
					return $http.get("https://ws.audioscrobbler.com/2.0/?method=track.getinfo&api_key=d17e980eb9b1ea8c7dd060939eac110d&artist=" + artist + "&track=" + track + "&format=json").
				 		success(function(data){
							if(data.error){
				 			 	notifications.showError({message: "Song Not Found. Please Search Again."});	
				 			}
				 			else{	
		            			//run the album search function to then fill in the rest of the info
		            			albumSet(data.track.album.artist, data.track.album.title);			 			
				 			}
				 		});
				};
				
				function youtubeSet(artist, album){
					return $http.get("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + artist + "+" + album + "&key=AIzaSyDVrxcnUUeCzL0Ek8vsZjWkveDDxIsNuD0").
						then(function success(response){
							youtubeInfo = response.data;
						}, 
						function error(response){
							console.log(response);
						});
				};
	
				function findItemsByKeywords(root){
					ebayInfo = root;
					console.log(ebayInfo);
				};
		
				function ebaySet(artist, album, format){
					if (format === undefined)
						var keyword = artist + " " + album;
	    			else
	        			var keyword = artist + " " + album + " " + format;
	        			
	        		var config = {crossDomain: true,
	   								dataType: 'script',
	        		};
	 				
	 				var url = encodeURI("https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=AdamLucz-RecordMa-PRD-b2f871c7c-e630c56d&GLOBAL-ID=EBAY-US&RESPONSE-DATA-FORMAT=JSON&callback=findItemsByKeywords&REST-PAYLOAD&keywords=" + keyword + "&responseencoding=JSON&paginationInput.entriesPerPage=5");
					return $http({
						    method: 'JSONP',
	    					url: url,
	    					crossDomain: true,
	   						dataType: 'script'
					}).
					then(function(response){
						console.log(response.data);
					});
	        		
				};
				
				function topAlbumSearch(artist){
					$http.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=d17e980eb9b1ea8c7dd060939eac110d&format=json").
						success(function(data){
							if(data.error){
				 			 	notifications.showError({message: "Artist Not Found. Please Search Again."});	
				 			}
				 			else{
								//console.log(data.topalbums.album);
								artistInfo = data.topalbums.album;
								$location.path('/artistInfo');
							}
						})
				};
	
				
				
				 function albumGet(){
					return albumInfo;
				};
				
				 function youtubeGet(){
					return youtubeInfo;
				};
				
				function ebayGet(){
					return ebayInfo;
				};
				
				function artistGet(){
					return artistInfo;
				};
				
			return{
				albumSet: albumSet,
				songSet: songSet,
				youtubeSet: youtubeSet,
				ebaySet: ebaySet,
				albumGet: albumGet,
				youtubeGet: youtubeGet,
				ebayGet: ebayGet,
				topAlbumSearch: topAlbumSearch,
				artistGet: artistGet
				
			}
		
	}]);
