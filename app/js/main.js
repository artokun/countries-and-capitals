/*global angular, console*/

angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'ngAnimate'])
  .constant('CAC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?')
  .constant('CAC_API_USER', 'username=artokun&callback=JSON_CALLBACK')
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
      .when('/countries/:country', {
        templateUrl: 'country.html',
        controller: 'countryCtrl'
      })
      .when('/error', {
        template: '<h3>Page not found - 404</h3><br><a href="#/">Go Home</a><br>'
      })
      .otherwise({
        redirectTo: '/error'
      });
  }])
  .factory('countriesRequest', ['$http', '$q', '$templateCache', 'CAC_API_PREFIX', 'CAC_API_USER', function ($http, $q, $templateCache, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    return {

    };
  }])
  .run(function ($rootScope, $location, $timeout) {
    "use strict";
    $rootScope.$on('$routeChangeError', function () {
      $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function () {
      $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
      $timeout(function () {
        $rootScope.isLoading = false;
      }, 1000);
    });
  })
  .controller('homeCtrl', ['$scope', function ($scope) {
    "use strict";
  }])
  .controller('countriesCtrl', ['$scope', '$location', '$http', 'CAC_API_PREFIX', 'CAC_API_USER', function ($scope, $location, $http, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    var goToPage;
    $http({
      method: 'JSONP',
      url: CAC_API_PREFIX + CAC_API_USER
    })
      .success(function (response) {
        $scope.countries = response.geonames;
      })
      .error(function (response) {
        console.log('Error' + response);
      });
    $scope.goToPage = function (countryCode) {
      $location.path('/countries/' + countryCode);
    };
  }])
  .controller('countryCtrl', ['$scope', '$location', '$http', 'CAC_API_PREFIX', 'CAC_API_USER', function ($scope, $location, $http, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    var countryName = 'United%20States';
    $http({
      method: 'JSONP',
      url: 'http://api.geonames.org/search?type=json&name_equals=' + countryName + '&' + CAC_API_USER
    })
      .success(function (response) {
        $scope.country = response.geonames[0];
      })
      .error(function (response) {
        console.log('Error' + response);
      });
  }]);