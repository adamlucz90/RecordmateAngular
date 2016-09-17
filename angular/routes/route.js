angular.
  module('recordmate').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

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
        when('/collection', {
        	templateUrl: '/templates/collection-index.html',
        }).
        when('/wishlist', {
        	templateUrl: '/templates/wishlist-index.html',
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
  	})
  }])