/*global angular, console, alert*/

angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'ngAnimate'])
  .constant('CAC_API_PREFIX', 'http://api.geonames.org/countryInfoJSON?')
  .constant('CAC_API_USER', 'username=artokun')
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
  .factory('countriesData', function ($cacheFactory) {
    "use strict";
    return $cacheFactory('myData');
  })
  .factory('countriesRequest', ['$http', 'countriesData', 'CAC_API_PREFIX', 'CAC_API_USER', function ($http, countriesData, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    return function () {
      var cache = countriesData.get('myData');
      if (cache) {
        return cache;
      } else {
        $http.get(CAC_API_PREFIX + CAC_API_USER)
          .success(function (data) {
            cache = countriesData.put('myData', data);
            alert('Success - ' + cache);
          });
        return cache;
      }
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
  .controller('countriesCtrl', ['$scope', '$location', 'countriesRequest', function ($scope, $location, countriesRequest) {
    "use strict";
    $scope.countries = countriesRequest();
    $scope.goToPage = function (countryCode) {
      $location.path('/countries/' + countryCode);
    };
  }])
  .controller('countryCtrl', ['$scope', function ($scope) {
    "use strict";
  }]);