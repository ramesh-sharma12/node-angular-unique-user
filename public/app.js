var demoApp = angular.module('demoApp', ['ui.router','ngStorage']);

demoApp.config(function($stateProvider, $urlRouterProvider) {
	  //
	  // For any unmatched url, redirect to /state1
	  $urlRouterProvider.otherwise("/circle");
	  
	  //
	  // Now set up the states
	  $stateProvider
	    .state('state1', {
	      url: "/circle",
	      controller: "MainController",
	      templateUrl: "public/circle.html"
	    });
});