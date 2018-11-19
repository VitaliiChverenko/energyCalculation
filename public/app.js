(function() {
  var config = {
    apiKey: "AIzaSyDLr18cufcg9szpwGvWp9V8ZT3gy_MVhxw",
    authDomain: "energycalculation-53ff6.firebaseapp.com",
    databaseURL: "https://energycalculation-53ff6.firebaseio.com",
    projectId: "energycalculation-53ff6",
    storageBucket: "energycalculation-53ff6.appspot.com",
    messagingSenderId: "230719897469"
  };
  firebase.initializeApp(config);
  var myApp = angular.module('energyСalculation', ['firebase', 'ngRoute', '720kb.datepicker', 'chart.js']);
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
  .when('/', {
    templateUrl: "signInView.html",
    controller: "signInController",
  })
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
    controller: "accountController",
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
  })
  .when('/electricity', {
    templateUrl: "electricityView.html",
    controller: "electricityController",
  })
});

  myApp.controller('myCtrl', function($scope, $firebaseArray, $firebaseAuth, $route, $window, $location, Auth){
      $scope.tmp=12;
      const rootRef = firebase.database().ref();
      const r = rootRef.child('users')
      $scope.object = $firebaseArray(rootRef);
      $scope.arr = $firebaseArray(r)

      // var auth = $firebaseAuth();

      Auth.$onAuthStateChanged(function(user) {
        $scope.firebaseUser = user;
  
        const userReference = firebase.database().ref(`users/${user.uid}`);
        userReference.on('value', snapshot => {
            // if (!snapshot.val()) {
            //     // User does not exist, create user entry
            //     userReference.set({
            //         email: user.email,
            //         displayName: user.displayName
            //     });
            // }
            $scope.curUser = snapshot.val()
            // $scope.newdep = Object.keys($scope.curUser.departments)
            // console.log($scope.curUser.name)
          });
        });

      // $scope.changeInfo = function() {
      //   const dbref = firebase.database().ref('users/' +  $scope.firebaseUser.uid)
      //   // $scope.dep = $scope.curUser.departments.reduce(function(result, item) {
      //   //   result[item] = ['energy'];
      //   //   return result;
      //   //   }, {})
      //   $scope.dep = Object.values($scope.curUser.departments)
      //   console.log($scope.dep)
      //   // dbref.update({
      //   //   id: $scope.firebaseUser.uid,
      //   //   name: $scope.curUser.name,
      //   //   age: $scope.curUser.age,
      //   //   location: $scope.curUser.location,
      //   //   departments: Object.values($scope.curUser.departments)
      //   // });
      // }

    $scope.signOut = function () {
      Auth.$signOut().then(function() {
          console.log('signout')
          $window.location.href = '#!/signIn'
        }).catch(function(error) {
          // An error happened.
        });
      }
    }
  )  
})()
