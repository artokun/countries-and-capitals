/*global describe, beforeEach, module, it, inject, expect*/


describe("myCache", function () {
  beforeEach(module('myApp.ServicesModule'));

  it('should return \'undefined\' if no data is cached',
    inject(function (myCache, $cacheFactory) {
      var cachedData = myCache.get('myData');
      expect(cachedData).toBe(undefined);
    }));


  it('should return data if data is cached',
    inject(function (myCache, $cacheFactory) {
      myCache.put('myData', 'data recieved');
      var cachedData = myCache.get('myData');
      expect(cachedData).toBe('data recieved');
    }));
});

/*
describe("countryFactory", function () {
  beforeEach(module('myApp.ServicesModule'));

  it('should return all country data from API',
    inject(function (countryFactory, $rootScope, $httpBackend) {
      $httpBackend.expect('GET', 'http://api.geonames.org/countryInfoJSON?username=artokun').respond(200);
      var status = false;
      countryFactory.getAllCountries().success(function () {
        status = true;
      });
      $rootScope.$digest();
      $httpBackend.flush();
      expect(status).toBe(true);
      $httpBackend.verifyNoOutstandingRequest();
    }));
});
*/