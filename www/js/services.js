angular.module('starter.services', [])

  .factory('Core', function () {
    return {
      base_url: 'http://localhost:9000',
      //www.team4hackathon.eu
      product: {},
      cart: [],
      quantity: []
    }
  })

  .service('ReadProductService', function ($cordovaBarcodeScanner, $location, $http, Core) {

    return {
      readProduct: function (callback) {
        $cordovaBarcodeScanner.scan().then(function (imageData) {

          //Call service to get product
          $http({
            method: 'GET',
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
          alert('An error occurred, please scan again');
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
