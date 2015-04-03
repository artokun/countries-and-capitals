/*global angular*/
angular.module('myApp.ServicesModule', ['myApp'])
  .factory('myCache', function ($cacheFactory) {
    "use strict";
    return $cacheFactory('myData');
  })
  .factory('countryFactory', ['$http', '$q', 'CAC_API_PREFIX', 'CAC_API_SEARCH', 'CAC_API_USER', 'CAC_API_NEIGHBORS', 'myCache',
      function ($http, $q, CAC_API_PREFIX, CAC_API_SEARCH, CAC_API_USER, CAC_API_NEIGHBORS, myCache) {
      "use strict";
      return {
        getAllCountries: function () {
          var cachedData = myCache.get('myData'),
            deferred;
          if (cachedData != null) {
            deferred = $q.defer();
            deferred.resolve(cachedData);
            return deferred.promise;

          } else {

            return $http.get(CAC_API_PREFIX + CAC_API_USER)
              .then(function (data) {
                myCache.put('myData', data.data);
                return data.data;
              });
          }
        },

        getCountry: function (countryCode) {
          return $http.get(CAC_API_PREFIX + 'country=' + countryCode + '&' + CAC_API_USER)
            .then(function (data) {
              return data.data;
            });
        },

        getNeighbors: function (geoId) {
          return $http.get(CAC_API_NEIGHBORS + geoId + '&' + CAC_API_USER)
            .then(function (data) {
              return data.data;
            });
        },

        getCapital: function (capital, countryCode) {
          return $http.get(CAC_API_SEARCH + capital + '&' + 'country=' + countryCode + '&maxRows=1&style=FULL&' + CAC_API_USER)
            .then(function (data) {
              return data.data;
            });
        }
      };
    }]);
