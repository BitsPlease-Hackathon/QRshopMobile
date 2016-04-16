angular.module('starter.controllers', [])

  /**
   *
   */
  .controller('ScannerCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, $location, ReadProductService) {
    $scope.temp = function () {
      $location.path('/order'); // todo delete
    };

    $scope.scanBarcode = function () {
      ReadProductService.readProduct();
    };

  })

  /**
   *
   */
  .controller('ProductCtrl', function ($scope, $cordovaBarcodeScanner, ReadProductService, $location, Core) {

    $scope.product = Core.product;

    $scope.addToCart = function () {
      Core.cart.push(Core.product.id); //TODO empty array
    };

    $scope.checkOut = function () {
      $location.path('/order');
    };

    $scope.scanBarcode = function () {
      ReadProductService.readProduct(function () {
          $scope.product = ProductFactory.product;
        }
      );

      console.log($scope.product);
      //$scope.$apply();
    };
  })

  /**
   *
   */
  .controller('OrderCtrl', function ($scope, OrderService, $location) {
    $scope.user = {};

    $scope.submit = function () {
      OrderService.createOrder($scope.user)
        .then(function (response) {
          alert('order created');
          console.log(response);
        }, function (error) {
          alert('error - ' + JSON.stringify(error))
        });
      $location.path('');
    }
  });
