angular.module('starter.controllers', [])

  .controller('ScannerCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, $locstion) {

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

  .controller('ProductCtrl', function ($scope, rootScope, $cordovaBarcodeScanner, $http) {
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
    }

  });
