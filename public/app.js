// (function() {
  var config = {
    apiKey: "AIzaSyDLr18cufcg9szpwGvWp9V8ZT3gy_MVhxw",
    authDomain: "energycalculation-53ff6.firebaseapp.com",
    databaseURL: "https://energycalculation-53ff6.firebaseio.com",
    projectId: "energycalculation-53ff6",
    storageBucket: "energycalculation-53ff6.appspot.com",
    messagingSenderId: "230719897469"
  };
  firebase.initializeApp(config);
  var myApp = angular.module('energyСalculation', ['firebase', 'ngRoute']);
  myApp.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);
// for ngRoute
// myApp.run(["$rootScope", "$location", function($rootScope, $location) {
//   $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
//     // We can catch the error thrown when the $requireSignIn promise is rejected
//     // and redirect the user back to the home page
//     if (error === "AUTH_REQUIRED") {
//       $location.path("/home");
//     }
//   });
// }]);

myApp.config(function($routeProvider) {
  $routeProvider
  .when('/signIn', {
    templateUrl: "signInView.html",
    controller: "signInController",
  })
  .when('/signUp', {
    templateUrl: "signUpView.html",
    controller: "signUpController",
  })
  .when('/home', {
    templateUrl: "home.html",
    controller: "myCtrl",
    // resolve: {
    //   // controller will not be loaded until $waitForSignIn resolves
    //   // Auth refers to our $firebaseAuth wrapper in the factory below
    //   "currentAuth": ["Auth", function(Auth) {
    //     // $waitForSignIn returns a promise so the resolve waits for it to complete
    //     return Auth.$requireSignIn();
    //   }]
    // }
  })
  .when("/account", {
    // the rest is the same for ui-router and ngRoute...
    controller: "myCtrl",
    templateUrl: "account.html",
    // resolve: {
    //   // controller will not be loaded until $requireSignIn resolves
    //   // Auth refers to our $firebaseAuth wrapper in the factory below
    //   "currentAuth": ["Auth", function(Auth) {
    //     // $requireSignIn returns a promise so the resolve waits for it to complete
    //     // If the promise is rejected, it will throw a $routeChangeError (see above)
    //     return Auth.$requireSignIn();
    //   }]
    // }
  });
});

  myApp.controller('myCtrl', function($scope, $firebaseArray, $firebaseAuth, $route, $window, $location, Auth){
      $scope.tmp=12;
      const rootRef = firebase.database().ref();
      const r = rootRef.child('users')
      $scope.object = $firebaseArray(rootRef);
      $scope.arr = $firebaseArray(r)
      // console.log($scope.object[2].name)
      

      // var auth = $firebaseAuth();

      Auth.$onAuthStateChanged(function(user) {
        $scope.firebaseUser = user;
        // $scope.name = user.name
        // var tmp = $scope.object.users.filter((el) => {
        //   return el.id = user.uid
        // })
        // console.log(user.uid)
        $scope.curUser = $scope.arr.filter((el) => {
          return el.id == user.uid
        })
        console.log($scope.arr)
      });
      $scope.changeInfo = function() {
        const dbref = firebase.database().ref('users/' +  $scope.firebaseUser.uid)
        dbref.update({
          name: $scope.curUser.name
        });
      }

      // $scope.createUser = function() {
      //   $scope.message = null;
      //   $scope.error = null;
  
      //   // Create a new user
      //   Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
      //     .then(function(firebaseUser) {
            
      //       $scope.message = "User created with uid: " + firebaseUser.uid;
      //       $scope.curus = firebaseUser.uid;

      //       const dbref = firebase.database().ref('users/' + firebaseUser.uid)
      //       dbref.set({
      //         id: firebaseUser.uid,
      //         name: $scope.name,
      //         email: $scope.email
      //       });
      //     }).catch(function(error) {
      //       $scope.error = error;
      //     });
      // };

      // Auth.$onAuthStateChanged(function(firebaseUser) {
      //   $scope.firebaseUser = firebaseUser;
      // });

    //   $scope.signIn = function() {
    //     Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
    //     .then(function(firebaseUser) {
    //       $window.location.href = '#!/account'
    //       $scope.firebaseUser = firebaseUser;
    //   }).catch(function(error) {
    //     $scope.errorCode = error.code;
    //     $scope.errorMessage = error.message;
    //   });
    // }

    $scope.signOut = function () {
      Auth.$signOut().then(function() {
          console.log('signout')
          $window.location.href = '#!/home'
        }).catch(function(error) {
          // An error happened.
        });
      }
    }
  )  
// })()
