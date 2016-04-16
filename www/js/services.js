angular.module('starter.services', [])

.factory('Core', function () {
  return {
    base_url : 'http://www.team4hackathon.eu:9000'
  }
})

.service('ScannerService', function ($cordovaBarcodeScanner) {
  return {
    scanBarcode: function() {
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        //TODO regex validate
        return imageData;
      }, function (error) {
        alert('An error occurred, please scan again');
        console.log('An error occurred: ' + error);
      });
    }
  }
})

.service('ProductService', function ($http, Core) {
  return {
    getProduct: function(uuid) {
      return $http({
        method: 'GET',
        url: Core.base_url + '/products/' + uuid
      })
    }
  }
})

.service('OrderService', function ($http, Core) {
  return {
    createOrder: function (user) {
      return $http({
        method: 'POST',
        url: Core.base_url,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: {
          fname: user.fname,
          lname: user.lname,
          email: user.email
        } // TODO
      });
    }
  }
});
