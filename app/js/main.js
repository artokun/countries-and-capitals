/*global angular, console*/

angular.module('myApp', [
  'ngRoute',
  'ngMessages',
  'ngAnimate'])
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
  }])
  .factory('myCache', function ($cacheFactory) {
    "use strict";
    return $cacheFactory('myData');
  })
  .factory('countryRequest', ['$http', 'CAC_API_PREFIX', 'CAC_API_USER', function ($http, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    return function (countryCode) {
      return $http.get(CAC_API_PREFIX + 'country=' + countryCode + '&' + CAC_API_USER);
    };
  }])
  .factory('capitalRequest', ['$http', 'CAC_API_SEARCH', 'CAC_API_USER', function ($http, CAC_API_SEARCH, CAC_API_USER) {
    "use strict";
    return function (capital, countryCode) {
      return $http.get(CAC_API_SEARCH + capital + '&' + 'country=' + countryCode + '&maxRows=1&style=FULL&' + CAC_API_USER);
    };
  }])
  .factory('neighborsRequest', ['$http', 'CAC_API_NEIGHBORS', 'CAC_API_USER', function ($http, CAC_API_NEIGHBORS, CAC_API_USER) {
    "use strict";
    return function (geoId) {
      return $http.get(CAC_API_NEIGHBORS + geoId + '&' + CAC_API_USER);
    };
  }])
  .factory('countriesRequest', ['$http', 'CAC_API_PREFIX', 'CAC_API_USER', function ($http, CAC_API_PREFIX, CAC_API_USER) {
    "use strict";
    return function () {
      return $http.get(CAC_API_PREFIX + CAC_API_USER);
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
  .controller('countriesCtrl', ['$scope', '$location', 'countriesRequest', 'myCache', function ($scope, $location, countriesRequest, myCache) {
    "use strict";
    $scope.goToPage = function (countryCode) {
      $location.path('/countries/' + countryCode + '/capital');
    };
    //check for cached country data
    var cache = myCache.get('myData');
    if (cache) {
      $scope.countries = cache;
    } else {
      //if not cached country data, get it and cache it
      countriesRequest().success(function (data) {
        $scope.countries = data.geonames;
        myCache.put('myData', data.geonames);
      });
    }
  }])
  .controller('countryCtrl', ['$scope', 'countryRequest', 'capitalRequest', 'neighborsRequest', '$routeParams', function ($scope, countryRequest, capitalRequest, neighborsRequest, $routeParams) {
    "use strict";
    var countryCode = $routeParams.country;
    countryRequest(countryCode).success(function (data) {
      var capital,
        geoId;
      $scope.country = data.geonames[0];
      capital = data.geonames[0].capital;
      geoId = data.geonames[0].geonameId;
      capitalRequest(capital, countryCode).success(function (data) {
        $scope.capital = data.geonames[0];
      });
      neighborsRequest(geoId).success(function (data) {
        $scope.neighbors = data.geonames;
      });
    });
  }]);