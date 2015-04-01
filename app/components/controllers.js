/*global angular*/
angular.module('myApp.CtrlModule', ['myApp', 'myApp.ServicesModule'])
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
  .controller('countryCtrl', ['$scope', '$rootScope', 'countryRequest', 'capitalRequest', 'neighborsRequest', '$routeParams', function ($scope, $rootScope, countryRequest, capitalRequest, neighborsRequest, $routeParams) {
    "use strict";
    $rootScope.isLoading = true;
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
        $rootScope.isLoading = false;
      });
    });
  }]);