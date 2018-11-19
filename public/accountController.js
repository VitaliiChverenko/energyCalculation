angular.module('energyСalculation').controller('accountController', function($scope, $firebaseArray, $firebaseAuth, $route, $window, $location, Auth){
    Auth.$onAuthStateChanged(function(user) {
        $scope.firebaseUser = user;
    
        const userReference = firebase.database().ref(`users/${user.uid}`);
        userReference.on('value', snapshot => {
            $scope.curUser = snapshot.val();
        });
    });

    $scope.changeInfo = function() {
        const dbref = firebase.database().ref('users/' +  $scope.firebaseUser.uid);
        dbref.update({
            // id: $scope.firebaseUser.uid,
            name: $scope.curUser.name,
            // email: $scope.firebaseUser.email,
            age: $scope.curUser.age,
            location: $scope.curUser.location,
            info: $scope.curUser.info,
        });
    }
})