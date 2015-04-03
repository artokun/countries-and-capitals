/*global angular*/
angular.module('myApp.CtrlModule', ['myApp', 'myApp.ServicesModule'])
  .controller('homeCtrl', ['$scope', function ($scope) {
    "use strict";
  }])
  .controller('countriesCtrl', ['$scope', '$location', 'countriesRequest', 'countryFactory', 'myCache', function ($scope, $location, countriesRequest, countryFactory, myCache) {
    "use strict";
    $scope.goToPage = function (countryCode) {
      $location.path('/countries/' + countryCode + '/capital');
    };
    
    countryFactory.getAllCountries()
      .then(function (data) {
          $scope.countries = data.geonames;
      });
  }])
  .controller('countryCtrl', ['$scope', '$rootScope', 'countryRequest', 'countryFactory', 'capitalRequest', 'neighborsRequest', '$routeParams', function ($scope, $rootScope, countryRequest, countryFactory, capitalRequest, neighborsRequest, $routeParams) {
    "use strict";
    $rootScope.isLoading = true;
    var countryCode = $routeParams.country;

    countryFactory.getCountry(countryCode)
      .then(function (data) {
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