angular.module('starter.controllers', [])

  /**
   *
   */
  .controller('HomeCtrl', function ($scope, $rootScope, $cordovaBarcodeScanner, $location, ReadProductService) {
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
      Core.cart.push(Core.product); //TODO empty array
    };

    $scope.checkOut = function () {
      $location.path('/order');
    };

    $scope.scanBarcode = function () {
      ReadProductService.readProduct(function () {
          $scope.product = Core.product;
        }
      );
      console.log($scope.product);
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
          $location.path('');
        }, function (error) {
          alert('error - ' + JSON.stringify(error));
          console.log(error);
        });
    }
  })

  /**
   *
   */
  .controller('CartCtrl', function ($scope, Core) {
    $scope.products = Core.cart;

    $scope.checkOut = function () {
      $location.path('/order');
    };

    $scope.removeProduct = function (index) {
      Core.cart.splice(index, 1);
    }
  });
