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
  .factory('countriesRequest', ['$http', '$q', '$templateCache', 'CAC_API_PREFIX', 'CAC_API_USER',
                       function ($http, $q, $templateCache, CAC_API_PREFIX, CAC_API_USER) {
      "use strict";
      return function (data) {
        var defer = $q.defer();
        $http({
          method: 'JSONP',
          url: CAC_API_PREFIX + CAC_API_USER,
          callback: 'JSON_CALLBACK',
          cache: $templateCache
        })
          .success(function (response) {
            console.log('Success' + response);
            defer.resolve(response);
          })
          .error(function (response) {
            console.log('Error' + response);
          });
        return defer.promise;
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
  .controller('countriesCtrl', ['$scope', 'countriesRequest', function ($scope, countriesRequest) {
    "use strict";
    $scope.countries = countriesRequest();
  }]);