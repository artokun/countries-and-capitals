/*global angular, console*/
angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'ngAnimate',
  'myApp.CtrlModule',
  'myApp.ServicesModule'])
  .constant('CAC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?')
  .constant('CAC_API_USER', 'username=artokun')
  .constant('CAC_API_SEARCH', 'http://api.geonames.org/searchJSON?q=')
  .constant('CAC_API_NEIGHBORS', 'http://api.geonames.org/neighboursJSON?geonameId=')
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
      .when('/countries/:country/capital', {
        templateUrl: 'country.html',
        controller: 'countryCtrl'
      })
      .when('/error', {
        template: '<h3>Page not found - 404</h3><br><a href="#/">Go Home</a><br>'
      })
      .otherwise({
        redirectTo: '/error'
      });
  }]);
  