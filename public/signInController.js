angular.module('energyСalculation').controller('signInController', function($scope, $firebaseObject, $firebaseAuth, $route, $window, $location, Auth){
    Auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
    });

    $scope.signIn = function() {
        Auth.$signInWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
        $window.location.href = '#!/electricity'
        $scope.firebaseUser = firebaseUser;
    }).catch(function(error) {
        $scope.errorCode = error.code;
        $scope.errorMessage = error.message;
    });
    }
})