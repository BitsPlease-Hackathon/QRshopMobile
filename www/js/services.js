angular.module('starter.services', [])

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

.service('GetProductService', function ($http) {
  return {
    getProduct: function(uuid) {
      $http({
        method: 'GET',
        url: BASE_URL + '/products/' + uuid
      })
    }
  }
})

.service('PostOrderService', function ($http, data) {
  return {
    createOrder: function () {
      $http({
        method: 'GET',
        url: BASE_URL,
        headers: {
          'Content-Type' : 'application/json'
        },
        data: { data: data } // TODO
      })
    }
  }
});
