
// angular.module('energyСalculation', ['firebase', 'ngRoute'])
angular.module('energyСalculation').controller('signUpController', function($scope, $firebaseObject, $firebaseAuth, $route, $window, $location, Auth){
  angular.module('ngvalueSelect', [])
//   .controller('RegionController', ['$scope', function($scope) {
//     $scope.data = {
//      model: null,
//      availableOptions: [
//           {value: 'myString', name: 'string'},
//           {value: 1, name: 'integer'},
//           {value: true, name: 'boolean'},
//           {value: null, name: 'null'},
//           {value: {prop: 'value'}, name: 'object'},
//           {value: ['a'], name: 'array'}
//      ]
//     };
//  }]);
    Auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
    });
    $scope.createUser = function() {
        $scope.message = null;
        $scope.error = null;
    
        // Create a new user
        Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
          .then(function(firebaseUser) {
            
            $scope.message = "User created with uid: " + firebaseUser.uid;
    
            const dbref = firebase.database().ref('users/' + firebaseUser.uid)
            dbref.set({
              id: firebaseUser.uid,
              name: $scope.name,
              email: $scope.email,
              state: $scope.data.state,
              region: $scope.data.region,
              companyName: $scope.data.companyName,
              companyType: $scope.data.companyType,
              companyAge: $scope.data.companyAge,
            });
          }).catch(function(error) {
            $scope.error = error;
          });
    };
})