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
  .controller('ProductCtrl', function ($scope, $location, $cordovaBarcodeScanner, ReadProductService, Core, $filter) {
    $scope.product = Core.product;
    $scope.product.modprice = Core.product.price * 1;

    $scope.goToCart = function () {
      $location.path('/cart');
    };

    $scope.addToCart = function () {
      var tempArray = $filter('filter')(Core.cart, Core.product);

      if (tempArray.length == 0) {
        Core.cart.push(Core.product);
        Core.quantity[Core.product.id] = 1;
      }
      else {
        Core.quantity[Core.product.id]++;
      }

      $scope.counter = 'x' +  Core.quantity[Core.product.id];
      $scope.product.modprice = Core.product.price * Core.quantity[Core.product.id];
    };

    $scope.checkOut = function () {
      if(Core.cart.length == 0) {
        Core.cart.push(Core.product);
        Core.quantity[Core.product.id] = 1;
      }
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
  .controller('OrderCtrl', function ($scope, OrderService, $location, Core, $http) {

    $scope.name = {};
    $scope.address = {};

    var orderDetails = [];

    angular.forEach(Core.cart, function (value, key) {
      var tempJson = {quantity : Core.quantity[value.id], product : {id : value.id}};
      orderDetails.push(tempJson);
    });

    $scope.submit = function () {

      var customer = {
        name : $scope.name,
        address : $scope.address
      };

      OrderService.createCustomer(customer).then(
        function successCustomer(response) {
          console.log(response);

          var order = {
            date : new Date,
            status : 'pending',
            orderDetails : orderDetails,
            customer : {
              id: response.data.id
            }
          };

          OrderService.createOrder(order).then(
            function successOrder(response) {
              console.log(response);
              alert('order submitted'); // TODO pop up
              Core = {};
              $location.path('/home');
            },
            function failOrder(error) {
              console.log(error);
              alert('error - ' + JSON.stringify(error));
            }
          );
        },
        function failCustomer(error) {
          console.log(error);
          alert('error - ' + JSON.stringify(error));
        }
      );
    }
  })

  /**
   *
   */
  .controller('CartCtrl', function ($scope, Core) {
    $scope.products = Core.cart;
    $scope.quantity = function (id) {
      return Core.quantity[id];
    };

    $scope.checkOut = function () {
      $location.path('/order');
    };

    $scope.removeProduct = function (index) {
      Core.cart.splice(index, 1);
    }
  });
