angular.module('starter.controllers', [])

  /**
   *
   */
  .controller('ScannerCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, $location) {
    $scope.temp = function () {
      $location.path('/order');
    };

    $scope.scanBarcode = function () {
      $cordovaBarcodeScanner.scan().then(function (imageData) {
        //TODO regex validate
        $rootScope.qrcode = imageData;
        $location.path('/product');
      }, function (error) {
        alert('An error occurred, please scan again');
        console.log('An error occurred: ' + error);
      })
    }
  })

  /**
   *
   */
  .controller('ProductCtrl', function ($scope, rootScope, $cordovaBarcodeScanner, ProductService) {
    var qrcodeData = $rootScope.qrcode;

    $scope.scanBarcode = function () {
      $cordovaBarcodeScanner.scan()
        .then(function (imageData) {
          //TODO regex validate
          qrcodeData = imageData;
        },
        function (error) {
          alert('An error occurred, please scan again');
          console.log('An error occurred: ' + error);
        })
    };

    ProductService.getProduct(qrcodeData.text)
      .then(function (responseSuccess) {
        //TODO show product
      }, function (responseError) {
        //TODO throw error
      })
  })

  /**
   *
   */
  .controller('OrderCtrl', function ($scope, OrderService, $location) {
    $scope.user = {};

    $scope.submit = function () {
      OrderService.createOrder($scope.user).then();
      $location.path('');
    }
  });
