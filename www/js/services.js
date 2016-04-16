angular.module('starter.services', [])

  .factory('Core', function () {
    return {
      base_url: 'http://localhost:9000',
      //www.team4hackathon.eu
      product: {},
      cart: {}
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
      createOrder: function (user) {
        return $http({
          method: 'POST',
          url: Core.base_url,
          headers: {
            'Content-Type': 'application/json'
          },
          data: [{
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            addressStreet: user.addressStreet,
            addressNumber: user.addressNumber, //todo empty string
            city: user.city,
            postalcode: user.postalcode
          }]

            [{
            date: new Date(),
            status: 'pending'
          }]

            [{
            quantity: quantity //TODO quantity
          }]

        });
      }
    }
  });
