/*global angular*/
angular.module('myApp.CtrlModule', ['myApp', 'myApp.ServicesModule'])
  .controller('homeCtrl', ['$scope', function ($scope) {
    "use strict";
  }])
  .controller('countriesCtrl', ['$scope', '$location', 'countryFactory', 'myCache', function ($scope, $location, countryFactory, myCache) {
    "use strict";
    //Click on row to redirect to detailed country data
    $scope.goToPage = function (countryCode) {
      $location.path('/countries/' + countryCode + '/capital');
    };
    //Get all countries data from AJAX or cache
    countryFactory.getAllCountries()
      .then(function (data) {
        $scope.countries = data.geonames;
      });
  }])
  .controller('countryCtrl', ['$scope', '$rootScope', 'countryFactory', '$routeParams', function ($scope, $rootScope, countryFactory, $routeParams) {
    "use strict";
    //Begin Loading
    $rootScope.isLoading = true;
    var countryCode = $routeParams.country;
    //Get country data
    countryFactory.getCountry(countryCode)
      .then(function (data) {
        var capital,
          geoId;
        $scope.country = data.geonames[0];
        capital = data.geonames[0].capital;
        geoId = data.geonames[0].geonameId;
        //Get capital data
        countryFactory.getCapital(capital, countryCode)
          .then(function (data) {
            $scope.capital = data.geonames[0];
          });
        //Get neighbor data
        countryFactory.getNeighbors(geoId)
          .then(function (data) {
            $scope.neighbors = data.geonames;
            //End Loading
            $rootScope.isLoading = false;
          });
      });
  }]);