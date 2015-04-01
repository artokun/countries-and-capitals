/*global angular*/
angular.module('myApp.ServicesModule', ['myApp'])
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
  }]);