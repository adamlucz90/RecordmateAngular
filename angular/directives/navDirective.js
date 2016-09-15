angular
	.module("recordmate")
	.directive('navigationbar', function(){
		return {
			restrict: 'EA',
			templateUrl: '/directives/nav-index.html',
			controller: 'navController'
		};
	});
	
