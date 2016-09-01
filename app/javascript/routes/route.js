angular.
  module('recordmate').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/search', {
            templateUrl: '/javascript/templates/search-index.html',
             controller: 'searchController',
            controllerAs: 'searchCtrl',
        }).
        when('/login', {
          templateUrl: '/javascript/templates/login-index.html',
        }).
        when('/register', {
        	templateUrl: '/javascript/templates/register-index.html',
        	controller: 'registerController',
        	controllerAs: 'registerCtrl',
        }).
        when('/albumInfo', {
        	templateUrl: '/javascript/templates/albumInfo-index.html',
        	controller: 'AlbumInfoController',
        	controllerAs: 'infoCtrl',
        }).
        when('/collection', {
        	templateUrl: 'javascript/templates/collection-index.html',
        }).
        when('/wishlist', {
        	templateUrl: 'javascript/templates/wishlist-index.html',
        });

    }
  ]);
