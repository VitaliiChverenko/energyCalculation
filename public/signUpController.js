
// angular.module('energyСalculation', ['firebase', 'ngRoute'])
angular.module('energyСalculation').controller('signUpController', function($scope, $firebaseObject, $firebaseAuth, $route, $window, $location, Auth){
    
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
            dbref.update({
              id: firebaseUser.uid,
              email: $scope.email,
              // energy: {
              //   0: {
              //     // costs: ''
              //   }
              // }
            });
            $window.location.href = '#!/account'
          }).catch(function(error) {
            $scope.error = error;
          });
    };
})