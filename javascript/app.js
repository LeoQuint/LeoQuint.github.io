
var leoquintApp = angular.module('leoquintApp', ['ngRoute', 'youtube-embed']);

leoquintApp.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            
            templateUrl : 'views/home.html',
            controller  : 'mainCtr'
        })
        //route to the cgg page
        .when('/capitalguess', {
            templateUrl : 'views/capitalguess.html',
            controller  : 'cggCtr'
        })
        //route to the fof page
        .when('/fightorflight', {
            templateUrl : 'views/fightorflight.html',
            controller  : 'fofCtr'
        })
        //route to the contact page
        .when('/contact', {
            templateUrl : 'views/contact.html',
            controller  : 'contactCtr'
        })
        //route to the hotelsim page
        .when('/sandwichhero', {
            templateUrl : 'views/sandwichhero.html',
            controller  : 'sandwichheroCTR'
        })
        // route for the youmech page
        .when('/youmech', {
            templateUrl : 'views/youmech.html',
            controller  : 'youmechCtr'
        })
         // route for the youmech page
        .when('/proto', {
            templateUrl : 'views/proto.html',
            controller  : 'protoCtr'
        })
         // route for the fly page
        .when('/fly', {
            templateUrl : 'views/fly.html',
            controller  : 'flyCtr'
        })
         // route for the communability page
        .when('/communability', {
            templateUrl : 'views/communability.html',
            controller  : 'communabilityCtr'
        })
        //default
        .otherwise({
            redirectTo: '/'
        });
});

leoquintApp.controller('mainCtr', function($scope) {
    // create a message to display in our view
    $scope.message = 'this is the main controller';
});
leoquintApp.controller('sandwichheroCTR', function($scope, $interval) {
        var counter = 0;
        $scope.sandVid = '1ihNkOqvoHM';
    $scope.images = ["../images/sandhero/1.JPG",
                    "../images/sandhero/2.JPG",
                    "../images/sandhero/3.JPG",
                    "../images/sandhero/4.JPG",
                    "../images/sandhero/5.JPG"];
    $scope.imageSRC = $scope.images[counter];

     $interval(function() {
            counter++;
            if(counter == 5)
            {
                counter = 0;
            }
             $scope.imageSRC = $scope.images[counter];
          }, 5000);
});
leoquintApp.controller('cggCtr', function($scope) {
    $scope.message = 'this is the about controller.';
});
leoquintApp.controller('fofCtr', function ($scope) {
  
  $scope.fof = 'oxm1RiFKzqU';
});
leoquintApp.controller('contactCtr', function($scope) {
    $scope.message = 'this is the login controller.';
});
leoquintApp.controller('flyCtr', function($scope, $interval) {
    var counter = 0;
    $scope.images = ["../images/Fly/1.png",
                    "../images/Fly/2.png",
                    "../images/Fly/3.png",
                    "../images/Fly/4.png"];
    $scope.imageSRC = $scope.images[counter];

     $interval(function() {
            counter++;
            if(counter == 4)
            {
                counter = 0;
            }
             $scope.imageSRC = $scope.images[counter];
          }, 5000);
});
leoquintApp.controller('communabilityCtr', function($scope, $interval) {
     var counter = 0;
    $scope.images = ["../images/Communability/1.png",
                    "../images/Communability/2.png",
                    "../images/Communability/3.png",
                    "../images/Communability/4.png"];
    $scope.imageSRC = $scope.images[counter];

     $interval(function() {
            counter++;
            if(counter == 4)
            {
                counter = 0;
            }
             $scope.imageSRC = $scope.images[counter];
          }, 5000);
});
leoquintApp.controller('protoCtr', function($scope, $interval) {   
    var counter = 0;
    $scope.images = ["../images/proto/1.png",
                    "../images/proto/2.png",
                    "../images/proto/3.png",
                    "../images/proto/4.png",
                    "../images/proto/5.png"];
    $scope.imageSRC = $scope.images[counter];
    $scope.protoVid = 'j4doI7H82Gs';
     $interval(function() {
            counter++;
            if(counter == 5)
            {
                counter = 0;
            }
             $scope.imageSRC = $scope.images[counter];
          }, 5000);
});
leoquintApp.controller('youmechCtr', function($scope, $interval){

    var counter = 0;
    $scope.images = ["../images/YMMC/YMMC1.png",
                    "../images/YMMC/YMMC2.png",
                    "../images/YMMC/YMMC3.png",
                    "../images/YMMC/YMMC4.png",
                    "../images/YMMC/YMMC5.png",
                    "../images/YMMC/YMMC6.png",
                    "../images/YMMC/YMMC7.png",
                    "../images/YMMC/YMMC8.png",
                    "../images/YMMC/YMMC9.png",];
    $scope.imageSRC = $scope.images[counter];

     $interval(function() {
            counter++;
            if(counter == 9)
            {
                counter = 0;
            }
             $scope.imageSRC = $scope.images[counter];
          }, 5000);
});