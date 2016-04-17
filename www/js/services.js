angular.module('starter.services', [])

  .factory('Core', function () {
    return {
      base_url: 'http://139.59.140.191:9000',
      product: {},
      cart: [],
      quantity: []
    }
  })

  .service('ReadProductService', function ($cordovaBarcodeScanner, $location, $http, Core) {

    return {
      readProduct: function (callback) {
        $cordovaBarcodeScanner.scan().then(function (imageData) {

          if (imageData == "" || imageData == null) {
            $location.path('/');
            return;
          }

          //Call service to get product
          $http({
            method: 'GET',
            headers : {
              'Content-Type': 'application/json',
              'Accept' : 'application/json'
            },
            url: Core.base_url + '/products/' + imageData.text
          }).then(function (responseSuccess) {

            Core.product = responseSuccess.data;
            if (callback) {
              callback();
            }
            // redirect to product page
            $location.path('/product');
          }, function (responseError) {
            console.log(responseError);
          });

        }, function (error) {
          console.log('An error occurred: ' + error);
        })
      }
    }

  })

  .service('OrderService', function ($http, Core) {
    return {
      createCustomer: function (customer) {
        return $http({
          method: 'POST',
          url: Core.base_url + '/customers',
          dataType: 'json',
          data: customer
        });
      },

      createOrder: function (order) {
        return $http({
          method: 'POST',
          url: Core.base_url + '/orders',
          dataType: 'json',
          data: order
        })
      }
    }
  });
