var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(function($routeProvider, $locationProvider){
   
    $locationProvider.hashPrefix('');
    
    $routeProvider
    .when('/',{
        templateUrl : "pages/main.html",
        controller : "mainController"
    })
    .when('/login',{
        templateUrl : "pages/login.html",
//        controller : "loginController"
    })
    .when('/hotel',{
        templateUrl : "pages/hotel.html",
        controller : "hotelController"
    })
    .when('/booking',{
        templateUrl : "pages/booking.html",
        controller : "bookingController"
    })
    .when('/notifications',{
        templateUrl : "pages/notifications.html",
        controller : "notificationController"
    })
    .otherwise('/');
    
    
});


var loggedIn;
// CONTROLLER FOR INDEX.HTML
// navController
myApp.controller("navController", ['$scope','$cookies', function($scope,$cookies){
//    $scope.loggedIn = loggedIn;
//    if($scope.loggedIn == undefined) loggedIn = 0;
    
    $scope.checkLoggedIn = function(){
        if (loggedIn == 1 || $cookies.get("id")) return true;
        else return false;
    }
    
    $scope.logout = function(){
        $cookies.remove("id");
        window.location.href = "index.html" ;
        loggedIn = 0;
    }
    
}]);






// CONTROLLERS FOR MAIN.HTML
// mainController
myApp.controller("mainController", ['$scope','$http','$cookies', function($scope, $http, $cookies){
    $scope.hotels = [];
    $scope.requestData = {
        query : "",
        filter : "",
        location : 0,
        
    }
    
    // SEARCH HOTELS BY NAME OR PLACE
    $scope.searchByName = function(){
        $scope.requestData.location = 0;
        $scope.searchHotels();
        
    };
    
    $scope.searchHotels = function(){
        $http.post("./searchHotels.php", JSON.stringify($scope.requestData)) 
        .then(function(response){
            $scope.hotels = response.data;
            console.log($scope.hotels);
        });
    };
    
    // ON CLICKING ANY FILTERS
    // cost
    // ratings
    $scope.filterNum = 0;
    $scope.setFilter = function(value){
        $scope.filterNum = value;
//        console.log($scope.filterNum);
        if ($scope.filterNum == 1){
            $scope.requestData.filter = "cost asc"
        }        
        else if ($scope.filterNum == 2){
            $scope.requestData.filter = "rat_avg desc"
        }
        $scope.searchHotels();
    }
    
    
    
    // FOR GEOLOCATION
    $scope.latitude = 0;
    $scope.longitude = 0;
    $scope.getLocation = function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else { 
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    };
    $scope.showPosition = function(position){
        $scope.latitude = position.coords.latitude; 
        $scope.longitude = position.coords.longitude; 
        console.log("latitude :"+ $scope.latitude);
        console.log("longitude :"+ $scope.longitude);
        // GET REQUEST HERE
        $scope.locationRange($scope.latitude, $scope.longitude);
    }
    
    $scope.locationRange = function(lat, long){
//        Latitude: 1 deg = 110.574 km
//        Longitude: 1 deg = 111.320*cos(latitude) km
        var latRadius = (1/110.574) * 5 ; //degrees
        var longRadius = (1/ (111.320 * Math.cos(lat*Math.PI/180))) * 5; 
        $scope.requestData.maxLat = lat + latRadius;
        $scope.requestData.minLat = lat - latRadius;
        $scope.requestData.maxLong = long + longRadius;
        $scope.requestData.minLong = long - longRadius;
        $scope.requestData.location = 1;
        console.log("Lat Range : "+$scope.requestData.minLat+" - "+$scope.requestData.maxLat);
        console.log("Long Range : "+$scope.requestData.minLong+" - "+$scope.requestData.maxLong);
        
        $scope.searchHotels();
     }
    
    // set Hotel id as cookie for next pages
    $scope.setHotelId = function(id){
        $cookies.put("hotelId",id);
    };
   
}]);




//// filterController
//myApp.controller("filterController", ["$scope", function($scope){
////    $scope.filterNum = 0;
////    
////    $scope.setFilter = function(value){
////        $scope.filterNum = value;
////    }
////    
//    // if filterNum == 1 most affordable ie lowest price
//    // if filterNum == 2 highest rated
//    
//}]);

















// CONTROLLERS FOR LOGIN.HTML
myApp.controller("loginController", ["$scope","$http","$cookies", function($scope,$http,$cookies){
    
    $scope.data = {
        email : "",
        password : "",
        
    };
    
    $scope.loginSubmit = function(){
        
        // send to php
        $http.post('./login.php', JSON.stringify($scope.data))
         .then(function(response){
                // console the send data
                console.log(response.data);
                if(response.data == "success")
                {
                    $scope.msg = "Logged in successfully !";
                    loggedIn = 1;
                    // redirect to previous page
                    setTimeout(function(){
                        window.history.back();
                    },1000)
                    
                }
                else   
                    $scope.msg = response.data;
            }
         );
    };
}]);

myApp.controller("registerController", ["$scope","$http", function($scope,$http){
    
    $scope.data = {
        fullName :"",
        email : "",
        password : "",
        confirm : ""
    };
    
    $scope.registerSubmit = function(){
        
        // send to php
        $http.post('./register.php', JSON.stringify($scope.data))
         .then(function(response){
                // console the send data
                console.log(response.data);
                if(response.data == "success"){
                    $scope.msg = "Registered successfully !";
                    loggedIn = 1;
                    // redirect to previous page
                    setTimeout(function(){
                        window.history.back();
                    },1000)
                }
                else   
                    $scope.msg = response.data;
            }
         );
        
       
    };
    
}]);



// CONTROLLERS FOR HOTEL.HTML

myApp.controller("hotelController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    $scope.hotelDetails = {};
    $scope.reviews = [];
    $scope.newReview = {
        text : "",
        rating : 1,
        uId : $cookies.get("id"),
        hId : $cookies.get("hotelId"),
    };
    
    // add review
    $scope.addReview = function(){
        console.log($scope.newReview);
        $http.post('./addReview.php', JSON.stringify($scope.newReview))
         .then(function(response){
                // console the send data
                console.log(response.data);
                getReviews($cookies.get("hotelId"));
            }
         );
    }
    
    // fetch reviews
    var getReviews = function(hotelId){
        // send to php
        $http.post('./getReviews.php', JSON.stringify({id : hotelId}))
         .then(function(response){
                // console the send data
                console.log(response.data);
                $scope.reviews = response.data;
//                console.log($scope.hotelDetails.name);
                
            }
         );
    }
    
   
    // fetch details for the page
    var getHotelDetails = function(hotelId){
        // send to php
        $http.post('./getHotelDetails.php', JSON.stringify({id : hotelId}))
         .then(function(response){
                // console the send data
                console.log(response.data[0]);
                $scope.hotelDetails = response.data[0];
                console.log($scope.hotelDetails.name);
                
            }
         );
    };
    
    //check logged in
    $scope.checkLoggedIn = function(){
        if (loggedIn == 1 || $cookies.get("id")) return true;
        else return false;
    }
    
    getHotelDetails($cookies.get("hotelId"));
    getReviews($cookies.get("hotelId"));
    
}]);


// CONTROLLERS FOR BOOKING.HTML
myApp.controller("bookingController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    $scope.hotelDetails = {};
   
    // fetch available rooms based on date range
    $scope.bookingDetails = {
        start : "" ,
        end : "",
        single : 0,
        double : 0,
        family : 0,
        uId : $cookies.get("id"),
        hId : $cookies.get("hotelId"),
    };
    
    $scope.detailsFetched = false;
    
    $scope.getAvailableRooms = function(){
        console.log($scope.bookingDetails);
        // send to php
        $http.post('./getAvailability.php', JSON.stringify($scope.bookingDetails))
         .then(function(response){
                // console the send data
                console.log(response.data);
                if(response.data[0].availSB != null && response.data[0].availDB != null && response.data[0].availFR != null){
                    $scope.hotelDetails.availSB = parseInt( parseInt($scope.hotelDetails.totalSB) - parseInt(response.data[0].availSB) );
                    $scope.hotelDetails.availDB = parseInt( parseInt($scope.hotelDetails.totalDB) - parseInt(response.data[0].availDB) );
                    $scope.hotelDetails.availFR = parseInt( parseInt($scope.hotelDetails.totalFR) - parseInt(response.data[0].availFR) );
                    
                }
                else{
                    $scope.hotelDetails.availSB = parseInt( $scope.hotelDetails.totalSB );
                    $scope.hotelDetails.availDB = parseInt( $scope.hotelDetails.totalDB );
                    $scope.hotelDetails.availFR = parseInt( $scope.hotelDetails.totalFR );
                }
                $scope.detailsFetched = true;
                
            }
         );
    };
    
    //BOOK ROOMS
    $scope.bookRooms = function(){
        console.log($scope.bookingDetails);
        // send to php
        $http.post('./bookRooms.php', JSON.stringify($scope.bookingDetails))
         .then(function(response){
                // console the send data
                console.log(response.data);
                window.location.href = "index.html";
            }
         );
    };
    
    
    
    // fetch details for the page
    var getHotelDetails = function(hotelId){
        // send to php
        $http.post('./getHotelDetails.php', JSON.stringify({id : hotelId}))
         .then(function(response){
                // console the send data
                console.log(response.data[0]);
                $scope.hotelDetails = response.data[0];
                console.log($scope.hotelDetails.name);
                
            }
         );
    };
    
    //check logged in
    var checkLoggedIn = function(){
        if (loggedIn == 1 || $cookies.get("id")) return true;
        else return false;
    }
    var redirectHome = function(){
        if(checkLoggedIn() == false)
            window.location.href = "index.html";
    }
    redirectHome();
    getHotelDetails($cookies.get("hotelId"));
    
}]);


// CONTOLLERS FOR NOTFICATIONS.HTML
myApp.controller("notificationController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){
    $scope.notifications = [];
    
    
    var getNotifications = function(userId){
        console.log(userId);
         $http.post('./getNotifications.php', JSON.stringify({uId : userId}))
         .then(function(response){
                // console the send data
                console.log(response.data);
                $scope.notifications = response.data;
                console.log($scope.notifications);
            }
         );
    }
    getNotifications($cookies.get("id"));
}]);
