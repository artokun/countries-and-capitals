/*global angular*/

angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'ngAnimate',
  'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    "use strict";
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'homeCtrl'
      })
      .when('/countries', {
        templateUrl: 'countries.html',
        controller: 'countriesCtrl'
      })
      .otherwise({
        redirectTo: '/error'
      });
  }]);