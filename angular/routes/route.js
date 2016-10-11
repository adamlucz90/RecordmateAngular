angular.
  module('recordmate').
  config(['$locationProvider' ,'$routeProvider', 'notificationsConfigProvider',
    function config($locationProvider, $routeProvider, notificationsConfigProvider) {
	    //config for ngNotificationsBar
	    // auto hide
	    notificationsConfigProvider.setAutoHide(true);
	
	    // delay before hide
	    notificationsConfigProvider.setHideDelay(5000);    	
    	
      $locationProvider.hashPrefix('!');
      
	//config for routeprovider
      $routeProvider.
        when('/search', {
            templateUrl: '/templates/search-index.html',
             controller: 'searchController',
            controllerAs: 'searchCtrl',
        }).
        when('/login', {
          templateUrl: '/templates/login-index.html',
          controller: 'loginController',
          controllerAS: 'loginCtrl'
        }).
        when('/register', {
        	templateUrl: '/templates/register-index.html',
        	controller: 'registerController',
        	controllerAs: 'registerCtrl',
        }).
        when('/albumInfo', {
        	templateUrl: '/templates/albumInfo-index.html',
        	controller: 'AlbumInfoController',
        	controllerAs: 'infoCtrl',
        }).
        when('/artistInfo', {
        	templateUrl: '/templates/artistInfo-index.html',
        	controller: 'artistInfoController',
        	controllerAs: 'artistCtrl'
        }).
        when('/collection', {
        	templateUrl: '/templates/collection-index.html',
        	controller: 'collectionController',
        	controllerAs: 'collectionCtrl'
        }).
        when('/wishlist', {
        	templateUrl: '/templates/wishlist-index.html',
        	controller: 'wishlistController',
        	controllerAs: 'wishlistCtrl'
        }).
        when('/profile', {
        	templateUrl: '/templates/profile-index.html',
        	controller: 'profileController',
        	controllerAs: 'profileCtrl'
        }).
        when('/userProfile', {
        	templateUrl: '/templates/usersearch-index.html',
        	controller: 'searchProfileController',
        	controllerAs: 'searchProfileCtrl'
        }).
        otherwise({redirectTo: '/search'});

    }
  ])
  .run(['$rootScope', '$location', 'userAuth', function($rootScope, $location, userAuth){
  	//ensures only authenticated users can access their wishlist and collection pages
  	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
  		if ($location.path() === '/wishlist' && !userAuth.isLogged()){
  			//redirect them back to homepage
  			$location.path('/search');
  		}
  		else if ($location.path() === '/collection' && !userAuth.isLogged()){
  			//redirect them back to homepage
  			$location.path('/search');
  		}
  		else if ($location.path() === '/profile' && !userAuth.isLogged()){
  			//redirect them back to the homepage
  			$location.path('/search');
  		}
  	});
  }]);
